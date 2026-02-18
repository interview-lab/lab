## 프로젝트 구조

이 프로젝트는 Turborepo 기반 모노레포로, pnpm 워크스페이스를 사용합니다.

### 워크스페이스 구성

```
interview/
├── apps/
│   ├── frontend/        # Next.js 프론트엔드 애플리케이션
│   └── backend/         # NestJS 백엔드 API 서버
└── packages/
    ├── ui/              # React 컴포넌트 라이브러리 (Vite + Storybook)
    ├── shared/          # 공유 유틸리티 및 타입
    └── typescript-config/ # 공유 TypeScript 설정
```

### 주요 애플리케이션

**Frontend (`apps/frontend`)**
- Next.js 16 with App Router
- React 19 with React Compiler
- Vanilla Extract for styling
- `@interview-lab/ui` 컴포넌트 라이브러리 사용

**Backend (`apps/backend`)**
- NestJS 11
- Jest for testing
- Express 기반

**UI Package (`packages/ui`)**
- Vite로 빌드되는 React 컴포넌트 라이브러리
- Vanilla Extract (CSS-in-TypeScript)
- Storybook 9 for component development
- Atomic Design 패턴:
  - `atoms/`: 기본 컴포넌트 (Button, Input, Icon, Badge)
  - `molecules/`: 조합 컴포넌트 (InputWithValidation)
  - `typographies/`: 타이포그래피 컴포넌트 (Title, Subtitle, Base, Caption)
- SVG 아이콘은 `src/assets/svgs/`에 위치, SVGR로 React 컴포넌트로 변환

**Shared Package (`packages/shared`)**
- tsup으로 빌드
- 모든 워크스페이스에서 공유하는 유틸리티 및 타입

---

## 개발 명령어

### 루트 레벨 명령어

```bash
# 모든 워크스페이스 개발 서버 실행
pnpm dev

# 모든 워크스페이스 빌드
pnpm build

# 코드 린트 (Biome)
pnpm lint

# 코드 포맷팅 (Biome)
pnpm format

# 타입 체크
pnpm check-types
```

### 특정 워크스페이스 명령어

Turbo 필터를 사용하여 특정 워크스페이스만 실행:

```bash
# Frontend만 개발 모드로 실행
pnpm dev --filter=@interview-lab/frontend

# UI 패키지만 빌드
pnpm build --filter=@interview-lab/ui

# Backend만 린트
pnpm lint --filter=@interview-lab/backend
```

### UI 패키지 전용 명령어

```bash
cd packages/ui

# Storybook 실행
pnpm storybook

# Storybook 빌드
pnpm build-storybook

# 개발 모드 (watch 모드로 빌드)
pnpm dev
```

### Backend 전용 명령어

```bash
cd apps/backend

# 개발 모드 (watch)
pnpm dev

# 디버그 모드
pnpm debug

# 테스트
pnpm test
pnpm test:watch
pnpm test:cov

# E2E 테스트
pnpm test:e2e
```

---

## 아키텍처 원칙

### 의존성 방향

```
apps/frontend → packages/ui → packages/shared
apps/backend → packages/shared
```

- Frontend와 Backend는 서로 의존하지 않음
- UI 패키지는 shared만 의존
- Shared는 외부 의존성만 가짐

### 컴포넌트 공유

- 재사용 가능한 UI 컴포넌트는 `packages/ui`에 작성
- 비즈니스 로직 컴포넌트는 `apps/frontend/src/components`에 작성
- 공통 타입/유틸은 `packages/shared`에 작성

### 빌드 출력

- UI 패키지: `dist/main.mjs` (ESM), `dist/main.umd.js` (UMD), `dist/ui-style.css`
- Shared 패키지: `dist/index.js` (ESM), `dist/index.cjs` (CJS)
- Frontend: `.next/` 디렉토리
- Backend: `dist/` 디렉토리
