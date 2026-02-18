---
paths:
  - apps/backend/**
---

## 백엔드 디렉토리 구조

```
apps/backend/
├── prisma/
│   ├── schema.prisma          # generator, datasource 설정만 포함
│   ├── models/                # 모델별 개별 .prisma 파일
│   │   ├── user.prisma        # User, RegistrationType, AuthProvider enum
│   │   ├── session.prisma
│   │   ├── question.prisma
│   │   ├── answer.prisma
│   │   ├── bookmark.prisma
│   │   ├── email-verification.prisma
│   │   └── oauth-pending.prisma
│   └── migrations/
└── src/
    ├── main.ts                # 앱 부트스트랩 (CORS, ValidationPipe, Swagger, cookieParser)
    ├── app.module.ts          # 루트 모듈
    ├── generated/prisma/      # Prisma Client 자동 생성 결과 (수동 수정 금지)
    ├── auth/                  # 인증 모듈
    │   ├── auth.module.ts
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── consts/            # JWT 시크릿, 만료 시간, 쿠키 키 상수
    │   ├── dtos/              # 인증 관련 DTO
    │   ├── errors/            # 토큰 에러 타입
    │   ├── guards/            # TokenGuard, AccessTokenGuard, TempTokenGuard, GoogleOAuthGuard
    │   ├── strategies/        # Passport 전략 (google.strategy.ts)
    │   └── types/             # JWT payload, OAuth 타입 정의
    ├── users/                 # 사용자 모듈
    │   ├── users.module.ts
    │   ├── users.controller.ts
    │   ├── users.service.ts
    │   ├── consts/
    │   ├── decorators/        # @User() 커스텀 데코레이터
    │   ├── dtos/              # ProfileDto, RegistrationTypeDto
    │   └── pipes/             # EmailPipe, PasswordPipe, UsernamePipe, LengthPipe
    ├── email/                 # 이메일 인증 모듈
    │   ├── email.module.ts
    │   ├── email.controller.ts
    │   ├── email.service.ts
    │   ├── consts/
    │   └── dtos/
    ├── interview/             # 인터뷰 세션 모듈
    │   ├── interview.module.ts
    │   ├── interview.controller.ts
    │   ├── interview.service.ts
    │   ├── dto/
    │   └── entities/
    ├── prisma/                # Prisma 서비스 모듈
    │   ├── prisma.module.ts
    │   └── prisma.service.ts  # PrismaClient extends, PrismaPg 어댑터
    ├── mastra/                # AI 에이전트 (Mastra 프레임워크)
    │   └── index.ts
    ├── common/
    │   └── consts/            # 공통 메시지, 단위 상수
    ├── config/                # 환경 설정 파일
    └── utils/
        └── result.ts          # Result 타입, ok(), err() 헬퍼
```

---

## NestJS 모듈 구성 방식

```typescript
@Module({
  imports: [
    PrismaModule,
    EmailModule,
    forwardRef(() => UsersModule), // 순환 참조 시 forwardRef 사용
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenGuard, GoogleStrategy, GoogleOAuthGuard],
  exports: [AuthService, TokenGuard], // 다른 모듈에서 사용할 것만 export
})
export class AuthModule {}
```

**순환 참조 패턴**: `AuthModule ↔ UsersModule`이 서로 의존할 때 양쪽 모두 `forwardRef()`를 사용한다.

```typescript
// auth.module.ts
imports: [forwardRef(() => UsersModule)]

// users.module.ts
imports: [forwardRef(() => AuthModule)]
```

---

## Prisma 스키마 분리 구조

`schema.prisma`는 generator/datasource 설정만 포함하고, 모델은 `prisma/models/` 하위에 개별 파일로 관리한다.

```prisma
// schema.prisma
generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  moduleFormat = "cjs"
}

datasource db {
  provider = "postgresql"
}
```

```prisma
// prisma/models/user.prisma
enum AuthProvider {
  EMAIL
  GOOGLE
  GITHUB
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  // ...
  registrationTypes RegistrationType[]
}

model RegistrationType {
  userId Int
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)

  type      AuthProvider
  value     String
  isDefault Boolean @default(false)

  @@id([type, value])          // 복합 PK
  @@unique([userId, type])     // 사용자당 같은 provider는 하나만
}
```

Prisma Client는 `src/generated/prisma/`에 생성된다 — **직접 수정 금지**.

---

## 환경변수 목록

```env
PORT=                         # 서버 포트

DATABASE_URL=                 # PostgreSQL 연결 문자열

JWT_SECRET=                   # JWT 서명 키

GOOGLE_CLIENT_ID=             # Google OAuth 앱 ID
GOOGLE_CLIENT_SECRET=         # Google OAuth 앱 시크릿
GOOGLE_CALLBACK_URL=          # Google OAuth 콜백 URL

GMAIL_USER=                   # Nodemailer용 Gmail 주소
GMAIL_APP_PASSWORD=           # Gmail 앱 비밀번호

FRONTEND_URL=                 # 프론트엔드 URL (CORS, OAuth 리다이렉트)

GOOGLE_GENERATIVE_AI_API_KEY= # Gemini AI API 키
```
