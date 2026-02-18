---
paths:
  - apps/backend/**
---

## DTO 작성 규칙

`class-validator` + `@ApiProperty` 조합을 사용한다. `@Expose()`는 응답 직렬화용이며, `plainToInstance`와 함께 쓴다.

```typescript
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose, Type as TransformType } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

@ApiSchema({ name: 'ProfileDto', description: '사용자 프로필 조회 DTO' })
export class ProfileDto {
  @Expose()
  @ApiProperty({ description: '이메일 주소', example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @Expose()
  @ApiProperty({ description: '프로필 이미지 URL', nullable: true })
  @IsString()
  @IsOptional()
  profileImage!: string | null;

  @Expose()
  @ApiProperty({ type: [RegistrationTypeDto] })
  @ValidateNested({ each: true })
  @TransformType(() => RegistrationTypeDto)
  registrationTypes!: RegistrationTypeDto[];
}
```

**DTO 변환 패턴**: 컨트롤러에서 `plainToInstance`로 응답 직렬화.

```typescript
return plainToInstance(ProfileDto, user, {
  excludeExtraneousValues: true, // @Expose() 없는 필드 제외
});
```

---

## 가드 계층 구조

```
TokenGuard (Base — Header Bearer 토큰)
  └── (AccessTokenGuard는 독립 구현, 쿠키 기반)

AccessTokenGuard   — 쿠키의 accessToken 검증, 만료 시 refreshToken으로 자동 갱신
TempTokenGuard     — x-temp-token 헤더, OAuth 임시 등록용
GoogleOAuthGuard   — AuthGuard('google') 확장, Passport 전략 실행
```

**AccessTokenGuard**: 쿠키에서 `accessToken`을 읽어 검증한다. 만료 시 `refreshToken`으로 새 토큰을 발급하고 쿠키에 재설정한 뒤 요청을 통과시킨다.

**TempTokenGuard**: `x-temp-token` 헤더에서 임시 토큰을 읽어 `OAuthPendingRegistration`을 조회한다. 만료 또는 존재하지 않으면 `UnauthorizedException`을 throw한다.

가드 내에서는 Result 타입을 사용하지 않고 **예외를 직접 throw**한다.

```typescript
@Injectable()
export class TempTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tempToken = request.headers['x-temp-token'];
    if (!tempToken) throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_NOT_FOUND);

    const [error, pending] = await this.authService.getPendingRegistration(tempToken);
    if (error) throw new UnauthorizedException(error.reason);

    request.tempToken = tempToken;
    return true;
  }
}
```

---

## @User() 커스텀 데코레이터

`src/users/decorators/user.decorator.ts`에 정의. `AccessTokenGuard`가 `request.user`에 설정한 값을 꺼낸다.

```typescript
export const User = createParamDecorator((_, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();
  if (!user) throw new InternalServerErrorException(
    'User Decorator는 AccessTokenGuard와 함께 사용되어야 합니다.',
  );
  return user;
});
```

컨트롤러에서 사용:

```typescript
@Get('profile')
@UseGuards(AccessTokenGuard)
getProfile(@User() user: UserModel): ProfileDto {
  return plainToInstance(ProfileDto, user, { excludeExtraneousValues: true });
}
```

---

## Swagger 통합

**전역 설정** (`main.ts`):

```typescript
const config = new DocumentBuilder()
  .setTitle('Interview lab API')
  .setDescription('인터뷰랩 API 문서')
  .setVersion('1.0')
  .addCookieAuth('accessToken') // 쿠키 인증 스키마 전역 등록
  .build();

SwaggerModule.setup('api', app, document, {
  yamlDocumentUrl: 'api/yaml',
  jsonDocumentUrl: 'api/json',
});
```

**컨트롤러 수준 데코레이터**:

```typescript
@Controller('auth')
@ApiTags('인증')                             // Swagger 그룹
export class AuthController {

  @Post('login/email')
  @ApiOperation({ summary: '이메일 로그인 API', description: '...' })
  @ApiCookieAuth('accessToken')              // 인증 필요 엔드포인트
  @ApiOkResponse({ type: ProfileDto })
  @ApiParam({ name: 'provider', enum: ['GOOGLE', 'GITHUB'] })
  async loginEmail() {}
}
```

---

## 서비스 계층 패턴

**메서드 명명 규칙**: `동사 + 대상` (camelCase)
- `createUser`, `getUserById`, `getUserByOAuthId`, `linkOAuthAccount`, `unlinkOAuthAccount`
- `loginWithEmail`, `registerWithEmail`, `handleOAuthCallback`, `completeOAuthRegistration`

**일반 흐름**: 유효성 검사 → Prisma 조회/수정 → Result 반환

```typescript
async createUser(data: ...) {
  // 1. 중복 검사
  const [checkError] = await this.checkDuplicateUser(data);
  if (checkError) return err(checkError);

  // 2. Prisma 트랜잭션 또는 단순 create
  const [error, newUser] = await catchError(
    this.prisma.user.create({ data: { ... } }),
  );
  if (error) return err({ reason: '사용자 생성에 실패했습니다' });

  return ok(newUser);
}
```

**Prisma 트랜잭션**: 여러 테이블을 원자적으로 조작할 때 `prisma.$transaction(async tx => { ... })`을 사용한다.

```typescript
const [txError, newUser] = await catchError(
  this.prisma.$transaction(async (tx) => {
    const user = await tx.user.create({ ... });
    await tx.oAuthPendingRegistration.delete({ where: { id: pending.id } });
    return user;
  }),
);
if (txError) return err({ reason: AUTH_MESSAGE.ERROR_OAUTH_CALLBACK_FAILED });
```

---

## 쿠키 기반 토큰 관리

`authService.setTokenToCookie(response, token, isRefreshToken?)` 패턴으로 중앙화.

```typescript
setTokenToCookie(response: Response, token: string, isRefreshToken = false) {
  const key = isRefreshToken ? 'refreshToken' : 'accessToken';
  response.cookie(key, token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: isRefreshToken,   // refreshToken만 httpOnly
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: (isRefreshToken ? JWT_REFRESH_TOKEN_EXPIRES_IN : JWT_ACCESS_TOKEN_EXPIRES_IN) * 1000,
  });
}
```

컨트롤러에서 Response 객체 전달:

```typescript
@Post('login/email')
async loginEmail(
  @Body() dto: EmailAndPasswordDto,
  @Res({ passthrough: true }) response: Response, // passthrough: true 필수
) {
  const [error] = await this.authService.loginWithEmail(response, dto);
  if (error) throw new BadRequestException(error.reason);
}
```

---

## 커스텀 파이프

`src/users/pipes/`에 입력 변환/검증용 파이프를 정의한다.

```typescript
@Injectable()
export class EmailPipe implements PipeTransform {
  transform(value: any) {
    const email = value.toString();
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      throw new BadRequestException('올바른 이메일 형식이 아닙니다');
    }
    return email;
  }
}
```

컨트롤러에서 파라미터 데코레이터와 함께 사용:

```typescript
@Get(':email')
getUser(@Param('email', EmailPipe) email: string) { ... }
```
