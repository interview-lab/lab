---
paths:
  - apps/backend/**
---

## Result 타입 기반 에러 처리

### Result 타입 정의

`src/utils/result.ts`:

```typescript
export type Result<E extends { reason: string }, S> = [E, null] | [null, S];

export function ok<S>(value: S): Result<never, S> {
  return [null, value];
}

export function err<const R extends string, E extends { reason: R }>(
  error: E,
): Result<E, never> {
  return [error, null];
}
```

에러 객체는 반드시 `{ reason: string }` 형태를 가져야 한다.

---

### catchError 유틸리티

`packages/shared/src/utils/catchError.ts`에 정의된 Promise 래퍼. Prisma 등 예외를 던지는 비동기 코드를 Result 패턴으로 변환한다.

```typescript
export async function catchError<E extends new (message?: string) => Error, R>(
  promise: Promise<R>,
  errorsToCatch?: E[],
): Promise<[InstanceType<E> | Error, null] | [null, R]>
```

사용법:

```typescript
const [error, user] = await catchError(
  this.prisma.user.findUnique({ where: { id } }),
);
if (error) return err({ reason: '사용자 조회에 실패했습니다' });
```

---

### 서비스에서 Result 반환

서비스 메서드는 비즈니스 로직 에러를 `err()`로 반환하고, 성공 시 `ok()`로 반환한다.
**예외를 throw하지 않는다** (가드 제외).

```typescript
async loginWithEmail(response: Response, dto: EmailAndPasswordDto) {
  // 실패: err() 반환
  const user = await this.usersService.getUserByEmail(dto.email);
  if (!user) return err({ reason: AUTH_MESSAGE.ERROR_USER_NOT_FOUND });

  const isPasswordValid = await bcrypt.compare(dto.password, user.password!);
  if (!isPasswordValid) return err({ reason: AUTH_MESSAGE.ERROR_PASSWORD_INVALID });

  // 성공: ok() 반환
  const tokens = this.generateToken(user);
  this.setTokenToCookie(response, tokens.accessToken);
  this.setTokenToCookie(response, tokens.refreshToken, true);
  return ok(null);
}
```

---

### 컨트롤러에서 Result 소비

컨트롤러는 서비스의 Result를 구조 분해하고, 에러가 있으면 NestJS 예외로 변환해 throw한다.

```typescript
@Post('login/email')
async loginEmail(
  @Body() dto: EmailAndPasswordDto,
  @Res({ passthrough: true }) response: Response,
) {
  const [error] = await this.authService.loginWithEmail(response, dto);

  if (error) {
    throw new BadRequestException(error.reason);
  }
  // 성공 시 암묵적으로 200 반환
}
```

값이 필요한 경우:

```typescript
const [error, tokens] = await this.authService.completeOAuthRegistration(...);
if (error || !tokens) throw new BadRequestException(error.reason);

this.authService.setTokenToCookie(response, tokens.accessToken);
```

**에러 타입 매핑**:
- 인증/권한 오류 → `UnauthorizedException`
- 잘못된 입력/비즈니스 규칙 위반 → `BadRequestException`
- 리소스 없음 → `NotFoundException`

---

### 가드에서 예외를 직접 throw

가드(`CanActivate`)는 Result 패턴 대신 예외를 직접 throw한다. 미들웨어 단계에서 처리되므로 Result 반환이 의미 없다.

```typescript
async canActivate(context: ExecutionContext): Promise<boolean> {
  const token = request.cookies?.accessToken;

  const [verifyError, payload] = this.authService.verifyToken(token);
  if (verifyError) throw new UnauthorizedException(verifyError.reason); // throw

  const user = await this.usersService.getUserById(payload.sub);
  if (!user) throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_INVALID); // throw

  request.user = user;
  return true;
}
```

---

### Prisma 트랜잭션과 Result 조합

`prisma.$transaction()` 내부에서는 예외를 throw해 롤백을 트리거하고, `catchError`로 바깥에서 Result로 변환한다.

```typescript
const [txError, newUser] = await catchError(
  this.prisma.$transaction(async (tx) => {
    const existing = await tx.user.findFirst({ where: { email } });
    if (existing) {
      throw new BadRequestException(AUTH_MESSAGE.ERROR_USER_ALREADY_EXISTS); // 트랜잭션 롤백
    }

    const user = await tx.user.create({ data: { ... } });
    await tx.oAuthPendingRegistration.delete({ where: { id: pending.id } });
    return user;
  }),
);

if (txError) return err({ reason: AUTH_MESSAGE.ERROR_OAUTH_CALLBACK_FAILED });
return ok(newUser);
```

---

### 패턴 요약

| 위치 | 에러 처리 방식 |
|------|--------------|
| 서비스 메서드 | `return err({ reason: ... })` / `return ok(value)` |
| 컨트롤러 | `const [error, value] = await service.method()` → `throw new XxxException(error.reason)` |
| 가드 | `throw new UnauthorizedException(...)` 직접 throw |
| 트랜잭션 내부 | `throw new BadRequestException(...)` 으로 롤백, 바깥에서 `catchError`로 캐치 |
| Prisma 비동기 호출 | `const [error, result] = await catchError(prisma.xxx())` |
