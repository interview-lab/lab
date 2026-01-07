# 프로젝트 구조 및 아키텍처

**프로젝트**: interview-lab  
**타입**: Turborepo 모노레포  
**패키지 매니저**: pnpm@9.0.0  
**Node.js**: >= 22

---

## 프로젝트 개요

이 프로젝트는 **Turborepo**와 **pnpm workspace**를 기반으로 한 모노레포로, Frontend(Next.js), Backend(NestJS), 공유 UI 컴포넌트 라이브러리로 구성되어 있습니다.

### 주요 기술 스택
- **Frontend**: Next.js 16 (App Router), React 19 with React Compiler
- **Backend**: NestJS 11, Express, Jest
- **UI Library**: Vite, Storybook 9, Vanilla Extract
- **Shared**: tsup (CJS + ESM)
- **Code Quality**: Biome (린터 + 포맷터), TypeScript 100% strict mode

---

## 디렉토리 구조

```
/Users/kimbohyeon/interview/
├── apps/
│   ├── frontend/                   # Next.js 16 프론트엔드 애플리케이션
│   │   ├── src/
│   │   │   ├── app/                # App Router (layout.tsx, page.tsx)
│   │   │   ├── components/         # 비즈니스 로직 컴포넌트 (현재 비어있음)
│   │   │   ├── hooks/              # 커스텀 훅 (현재 비어있음)
│   │   │   └── styles/             # 스타일 (base/, index.css.ts, globals.css)
│   │   ├── next.config.ts          # Vanilla Extract + React Compiler 플러그인
│   │   └── package.json
│   │
│   └── backend/                    # NestJS 11 백엔드 API 서버
│       ├── src/
│       │   ├── config/             # ConfigModule 설정 (PORT)
│       │   ├── main.ts             # 엔트리포인트
│       │   ├── app.module.ts       # Root 모듈
│       │   ├── app.controller.ts   # Root 컨트롤러 (GET /)
│       │   └── app.service.ts      # Root 서비스
│       ├── test/                   # E2E 테스트
│       ├── nest-cli.json
│       └── package.json
│
├── packages/
│   ├── ui/                         # React 컴포넌트 라이브러리
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   ├── fonts/          # Pretendard 폰트 (9개 weight)
│   │   │   │   └── svgs/           # 40개 SVG 아이콘
│   │   │   ├── components/
│   │   │   │   ├── atoms/          # Badge, Icon, Input
│   │   │   │   ├── molecules/      # InputWithValidation
│   │   │   │   └── typographies/   # Title, Subtitle, Base, Caption, ButtonText
│   │   │   ├── styles/
│   │   │   │   ├── theme.css.ts    # 디자인 토큰 (vars)
│   │   │   │   └── text.css.ts     # Pretendard 폰트 정의
│   │   │   ├── types/              # text.ts, svg.d.ts
│   │   │   └── index.ts            # 루트 export
│   │   ├── vite.config.js          # Vite 빌드 설정
│   │   ├── .storybook/             # Storybook 설정
│   │   └── package.json
│   │
│   ├── shared/                     # 공유 유틸리티
│   │   ├── src/
│   │   │   ├── utils/
│   │   │   │   ├── mergeClassnames.ts  # 클래스명 병합 유틸리티
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   └── typescript-config/          # 공유 TypeScript 설정
│       └── tsconfig.base.json      # 모든 워크스페이스가 상속하는 기본 설정
│
├── scripts/                        # 개발 스크립트
├── .github/                        # GitHub 설정 (workflows, templates)
├── .serena/                        # Serena 메모리
│   └── memories/                   # 프로젝트 메모리 파일들
├── turbo.json                      # Turborepo 설정
├── biome.json                      # Biome 린터/포맷터 설정
├── pnpm-workspace.yaml             # pnpm 워크스페이스 설정
├── package.json                    # 루트 package.json
└── CLAUDE.md                       # Claude Code 가이드
```

---

## 워크스페이스 구성

### 1. apps/frontend - Next.js 프론트엔드

**기술 스택**:
- Next.js 16 with App Router
- React 19 with React Compiler (babel-plugin-react-compiler)
- Vanilla Extract for CSS-in-TypeScript
- pnpm 의존성: `@interview-lab/ui`, `@interview-lab/shared`

**주요 파일**:
- `/Users/kimbohyeon/interview/apps/frontend/next.config.ts`: Vanilla Extract 플러그인 통합
- `/Users/kimbohyeon/interview/apps/frontend/src/app/layout.tsx`: Root Layout
- `/Users/kimbohyeon/interview/apps/frontend/src/app/page.tsx`: 홈 페이지

**빌드 출력**: `.next/` 디렉토리

**TypeScript 설정**:
- target: ES2017 (브라우저 호환성)
- jsx: react-jsx (React 17+ transform)
- moduleResolution: bundler
- paths: `@/*` → `./src/*`
- noEmit: true (Next.js가 컴파일 담당)

---

### 2. apps/backend - NestJS 백엔드

**기술 스택**:
- NestJS 11
- Express 기반
- Jest for testing (unit + E2E)
- ConfigModule (@nestjs/config)

**주요 파일**:
- `/Users/kimbohyeon/interview/apps/backend/src/main.ts`: 엔트리포인트 (bootstrap 함수)
- `/Users/kimbohyeon/interview/apps/backend/src/app.module.ts`: Root 모듈
- `/Users/kimbohyeon/interview/apps/backend/src/config/configuration.ts`: 환경 설정 (PORT)

**빌드 출력**: `dist/` 디렉토리

**TypeScript 설정**:
- target: ES2023 (Node.js 환경)
- module: nodenext
- experimentalDecorators: true (데코레이터 지원)
- emitDecoratorMetadata: true (DI를 위한 메타데이터)
- paths: `@/*` → `./src/*`

**API 엔드포인트**:
- `GET /`: "Hello World!" 반환

---

### 3. packages/ui - React 컴포넌트 라이브러리

**기술 스택**:
- Vite 7 (라이브러리 빌드)
- Storybook 9 (컴포넌트 개발)
- Vanilla Extract (CSS-in-TypeScript)
- SVGR (SVG → React 컴포넌트)
- Vitest + Playwright (브라우저 테스트)

**Atomic Design 구조**:

#### Atoms (기본 컴포넌트)
- **Badge** (`packages/ui/src/components/atoms/Badge/`): 라벨/상태 표시 배지
  - Props: `HTMLAttributes<HTMLSpanElement> & { children: ReactNode }`
  - 스타일: 둥근 테두리 (radius.full), 22px 높이, 패딩 10px/2px
  
- **Icon** (`packages/ui/src/components/atoms/Icon/`): 40개 SVG 아이콘
  - Props: `{ icon: keyof typeof Icons } & SVGProps<SVGSVGElement>`
  - 아이콘 목록: IconBookMark, IconCalendar, IconCheck, IconCheckCircle, IconClock, IconClose, IconDashboard, IconDatabase, IconDataStructure, IconDownload, IconExclamation, IconExclamationCircle, IconFire, IconGraph, IconHelp, IconHome, IconInvisible, IconKey, IconLike, IconLock, IconMail, IconMe, IconMute, IconNetwork, IconOpen, IconOS, IconPlay, IconPlus, IconRandom, IconRecord, IconReplay, IconSearch, IconSend, IconSetting, IconShare, IconTerminal, IconTrash, IconUp, IconWarning
  - 위치: `/Users/kimbohyeon/interview/packages/ui/src/assets/svgs/`

- **Input** (`packages/ui/src/components/atoms/Input/`): 텍스트 입력 필드
  - Props: `InputHTMLAttributes<HTMLInputElement> & { icon?: string }`
  - 스타일: 높이 52px, 최소 너비 200px, 테두리 2px, 반경 8px, 패딩 44px
  - 아이콘 지원 (왼쪽에 표시)
  - disabled 상태 스타일 자동 적용

#### Molecules (조합 컴포넌트)
- **InputWithValidation** (`packages/ui/src/components/molecules/InputWithValidation.tsx`): Input + 검증
  - Props: `InputProps & ({ isError: false } | { isError: true; errorMessage?: string })`
  - 에러 시 빨간 테두리 + IconExclamationCircle 표시
  - 에러 메시지 표시 (선택적)
  - disabled 시 에러 메시지 숨김

#### Typographies (타이포그래피)
모든 타이포그래피는 다음 패턴을 따름:
- Props: `{ textType: T; children: ReactNode; className?: string; style: keyof typeof StyleVariant }`
- 31가지 HTML 요소 지원 (h1~h6, p, span, strong, em, small, mark, del, ins, sub, sup, code, kbd, samp, var, abbr, cite, q, blockquote, pre, label, legend, caption, figcaption, div, dt, dd, th, td)
- 제네릭 타입으로 타입 안전성 보장
- color: 'inherit' (부모 색상 상속)
- whiteSpace: 'pre-line' (줄바꿈 처리)

**컴포넌트 목록**:
- **Title** (`packages/ui/src/components/typographies/Title/`):
  - textType 제한: 'h1' ~ 'h6'
  - 스타일 변형:
    - primary: 36px, ExtraBold(800)
    - secondary: 36px, Bold(700)
    - tertiary: 20px, Regular(400)

- **Subtitle** (`packages/ui/src/components/typographies/Subtitle/`):
  - 스타일: primary (16px, SemiBold(600))

- **Base** (`packages/ui/src/components/typographies/Base/`):
  - 스타일 변형:
    - primary: 14px, Medium(500)
    - secondary: 14px, Regular(400)

- **Caption** (`packages/ui/src/components/typographies/Caption/`):
  - 스타일: primary (12px, Light(300))

- **ButtonText** (`packages/ui/src/components/typographies/ButtonText/`):
  - 스타일 변형:
    - primary: 16px, Bold(700)
    - secondary: 14px, Bold(700)

---

### 스타일 시스템 (Vanilla Extract)

**중앙 디자인 토큰** (`/Users/kimbohyeon/interview/packages/ui/src/styles/theme.css.ts`):

#### 색상 (vars.color)
```typescript
{
  // Blue (Primary)
  blue: '#137FEC',
  blueHover: '#1067C4',
  blueActive: '#0E5AAF',
  blueLight: '#92ADC9',
  blueDark: '#233648',
  blueAlpha10: 'rgba(19, 127, 236, 0.1)',
  blueAlpha20: 'rgba(19, 127, 236, 0.2)',
  
  // Gray
  gray: '#4B5563',
  grayLight: '#E5E7EB',
  grayDark: '#374151',
  
  // Green (Success)
  green: '#0BDA5B',
  greenAlpha10/20/70,
  
  // Orange (Warning)
  orange: '#F97316',
  orangeAlpha10/20/70,
  
  // Base
  black: '#1A2633',
  white: '#FFFFFF',
  
  // Border
  border: {
    default: '#324D67',
    error: '#EF4444',
  },
  
  // Disabled
  disabled: {
    text: '#9CA3AF',
    border: '#D1D5DB',
    background: '#F3F4F6',
  }
}
```

#### 폰트 크기 (vars.fontSize)
```typescript
{
  sizeXs: '12px',    // Caption
  sizeSm: '14px',    // Base, ButtonText2
  sizeBase: '16px',  // ButtonText1, Subtitle
  sizeXl: '20px',    // Title3
  size4xl: '36px',   // Title1, Title2
}
```

#### 폰트 굵기 (vars.fontWeight)
```typescript
{
  light: '300',      // Caption
  regular: '400',    // Base2, Title3
  medium: '500',     // Base1
  semibold: '600',   // Subtitle
  bold: '700',       // ButtonText, Title2
  extrabold: '800',  // Title1
}
```

#### 간격 (vars.spacing, 4px 단위)
```typescript
{
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
}
```

#### 기타 토큰
- **radius**: sm(4px), default(8px), md(12px), lg(16px), xl(20px), full(9999px)
- **shadow**: sm, md, lg, xl
- **z-index**: dropdown(50), modal(100), tooltip(150)
- **border**: width1(1px), width2(2px)
- **blur**: sm(4px), md(8px), lg(12px)
- **font**: pretendard (9개 weight: 300, 400, 500, 600, 700, 800)

#### Pretendard 폰트
위치: `/Users/kimbohyeon/interview/packages/ui/src/styles/text.css.ts`
- Light (300): Pretendard-Light.woff2
- Regular (400): Pretendard-Regular.woff2
- Medium (500): Pretendard-Medium.woff2
- SemiBold (600): Pretendard-SemiBold.woff2
- Bold (700): Pretendard-Bold.woff2
- ExtraBold (800): Pretendard-ExtraBold.woff2

---

### 컴포넌트 작성 패턴

#### 1. Props 정의
```typescript
// HTML 속성 상속
type BadgeProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode }
type InputProps = InputHTMLAttributes<HTMLInputElement> & { icon?: string }
type IconProps = { icon: keyof typeof Icons } & SVGProps<SVGSVGElement>

// 제네릭 활용 (Typography)
type TitleProps<T extends TitleTextType> = {
  textType: T;
  children: ReactNode;
  className?: string;
  style: keyof typeof TitleStyleVarient;
}

const Title = <T extends TitleTextType>({ ... }: TitleProps<T>) => { ... }
```

#### 2. 스타일 작성
```typescript
// component.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const baseStyle = style({
  fontFamily: vars.font.pretendard,
  color: 'inherit',
  whiteSpace: 'pre-line',
});

export const StyleVariant = styleVariants({
  primary: [baseStyle, { fontSize: vars.fontSize.sizeBase }],
  secondary: [baseStyle, { fontSize: vars.fontSize.sizeSm }],
});
```

#### 3. 컴포넌트 구현
```typescript
// index.tsx
import { mergeClassnames } from '@interview-lab/shared';
import { componentStyle } from './component.css';

const Component = ({ className, ...props }) => {
  return (
    <div className={mergeClassnames(componentStyle, className)} {...props}>
      {children}
    </div>
  );
};

export default Component;
```

#### 4. Storybook 스토리
```typescript
// component.stories.ts
import type { Meta, StoryObj } from '@storybook/react-vite';
import Component from '.';

const meta = {
  title: 'Design System/Atom/Component',
  component: Component,
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Primary' },
};
```

---

### UI 패키지 빌드 설정

**Vite 설정** (`/Users/kimbohyeon/interview/packages/ui/vite.config.js`):
- 플러그인: @vitejs/plugin-react, vite-plugin-dts, @vanilla-extract/vite-plugin, @svgr/rollup
- 빌드 출력:
  - `dist/main.mjs` (ESM)
  - `dist/main.umd.js` (UMD)
  - `dist/ui-style.css` (통합 CSS)
  - `dist/src/main.d.ts` (TypeScript 타입)
- external: react, react-dom, react/jsx-runtime

**package.json exports**:
```json
{
  "exports": {
    ".": {
      "types": "./dist/src/main.d.ts",
      "import": "./dist/main.mjs",
      "require": "./dist/main.umd.js"
    },
    "./styles": "./dist/ui-style.css"
  }
}
```

**사용 예제** (Frontend에서):
```typescript
// 1. 스타일 import (layout.tsx 등)
import '@interview-lab/ui/styles';

// 2. 컴포넌트 import
import { Atom, Typography } from '@interview-lab/ui';

// 3. 사용
<Typography.Title textType="h1" style="primary">Welcome</Typography.Title>
<Atom.Badge>New</Atom.Badge>
<Atom.Icon icon="IconSearch" width={24} height={24} />
```

---

### Export 구조

**루트** (`/Users/kimbohyeon/interview/packages/ui/src/index.ts`):
```typescript
export * from './components/atoms';
export * from './components/typographies';
```

**Atoms** (`/Users/kimbohyeon/interview/packages/ui/src/components/atoms/index.ts`):
```typescript
export const Atom = {
  Badge,
  Icon,
  // Input은 export되지 않음 (InputWithValidation만 사용)
}

export default Atom;
```

**Typographies** (`/Users/kimbohyeon/interview/packages/ui/src/components/typographies/index.ts`):
```typescript
export const Typography = {
  Base,
  ButtonText,
  Caption,
  Subtitle,
  Title,
}

export default Typography;
```

---

### 4. packages/shared - 공유 유틸리티

**기술 스택**:
- tsup (빌드 도구)
- TypeScript 5.9.3

**제공 유틸리티**:

#### mergeClassnames
위치: `/Users/kimbohyeon/interview/packages/shared/src/utils/mergeClassnames.ts`

```typescript
export const mergeClassnames = (...classnames: Array<string | undefined>) => {
  return classnames.filter((classname) => !!classname).join(' ');
};
```

**사용 예제**:
```typescript
import { mergeClassnames } from '@interview-lab/shared';

// 기본 + 커스텀 스타일 병합
<div className={mergeClassnames(baseStyle, className)} />

// 조건부 스타일
<div className={mergeClassnames(
  baseStyle,
  isError ? errorStyle : '',
  disabled ? disabledStyle : '',
  className
)} />
```

**빌드 설정** (`tsup.config.ts`):
- Entry: `src/index.ts`
- Format: CJS + ESM (NestJS + Next.js/Vite 모두 지원)
- dts: true (타입 정의 생성)
- sourcemap: true
- treeshake: true
- minify: false

**빌드 출력**:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CJS)
- `dist/index.d.ts` (타입)

---

### 5. packages/typescript-config - 공유 TypeScript 설정

**제공 파일**: `tsconfig.base.json`

**주요 설정**:
```json
{
  "strict": true,
  "esModuleInterop": true,
  "declaration": true,
  "declarationMap": true,
  "sourceMap": true,
  "lib": ["ES2022"],
  "target": "ES2022",
  "moduleDetection": "force",
  "skipLibCheck": true
}
```

**상속 구조**:
```
tsconfig.base.json (base)
├── apps/frontend/tsconfig.json (ES2017, DOM, react-jsx, noEmit)
├── apps/backend/tsconfig.json (ES2023, nodenext, decorators)
├── packages/ui/tsconfig.json (ES2022, DOM, react-jsx, bundler)
└── packages/shared/tsconfig.json (ESNext, bundler, noEmit)
```

---

## 아키텍처 원칙

### 의존성 방향

```
┌─────────────────────────────────────────────────┐
│                  Root (pnpm)                    │
└─────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼─────┐ ┌──────▼──────────┐
│   frontend   │ │ backend  │ │ typescript-     │
│  (Next.js)   │ │(NestJS)  │ │    config       │
└───────┬──────┘ └────┬─────┘ └─────────────────┘
        │             │
        │             │
        ▼             ▼
┌───────────────┐     │
│      ui       │     │
│   (Vite)      │     │
└───────┬───────┘     │
        │             │
        ▼             ▼
┌────────────────────────┐
│       shared           │
│      (tsup)            │
└────────────────────────┘
```

**규칙**:
1. `frontend` → `ui` → `shared`
2. `backend` → `shared`
3. `frontend`와 `backend`는 서로 의존하지 않음
4. 모든 워크스페이스 → `typescript-config`

**내부 패키지 참조**:
```json
{
  "dependencies": {
    "@interview-lab/ui": "workspace:*",
    "@interview-lab/shared": "workspace:*"
  }
}
```

---

### 컴포넌트 공유 원칙

#### 어디에 작성할 것인가?

1. **packages/ui**: 재사용 가능한 UI 컴포넌트
   - 비즈니스 로직 없음
   - 범용적으로 사용 가능
   - 스타일이 완전히 캡슐화
   - 예: Button, Input, Badge, Icon

2. **apps/frontend/src/components**: 비즈니스 로직 컴포넌트
   - 프로젝트 특화 로직 포함
   - UI 패키지의 컴포넌트를 조합
   - 예: UserProfileCard, DashboardHeader

3. **packages/shared**: 공통 타입/유틸리티
   - UI와 무관한 순수 함수
   - 타입 정의
   - 예: mergeClassnames, API 타입

---

### 새 컴포넌트 추가 가이드

**UI 패키지에 컴포넌트 추가**:

```bash
# 1. 파일 생성
packages/ui/src/components/atoms/NewComponent/
├── index.tsx              # 컴포넌트 구현
├── newComponent.css.ts    # Vanilla Extract 스타일
└── newComponent.stories.ts  # Storybook 스토리

# 2. Props 정의 (HTML 속성 상속)
type NewComponentProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

# 3. 스타일 작성 (theme.css.ts 토큰 사용)
import { vars } from '@/styles/theme.css';

export const componentStyle = style({
  color: vars.color.blue,
  fontSize: vars.fontSize.sizeBase,
  padding: vars.spacing['4'],
  borderRadius: vars.radius.default,
});

# 4. 컴포넌트 구현 (mergeClassnames 사용)
import { mergeClassnames } from '@interview-lab/shared';

const NewComponent = ({ className, ...props }) => (
  <div className={mergeClassnames(componentStyle, className)} {...props} />
);

# 5. Storybook 스토리 작성
export const Primary: Story = {
  args: { variant: 'primary', children: 'Example' },
};

# 6. Export 추가
// packages/ui/src/components/atoms/index.ts
import NewComponent from './NewComponent';

export const Atom = {
  Badge,
  Icon,
  NewComponent,  // 추가
};

# 7. 포맷팅 및 빌드
pnpm format
pnpm build --filter=@interview-lab/ui

# 8. Storybook에서 확인
pnpm --filter=@interview-lab/ui storybook
```

---

## 빌드 시스템 (Turborepo)

**설정 파일**: `/Users/kimbohyeon/interview/turbo.json`

### Turbo 작업 정의

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],           // 의존 패키지 먼저 빌드
      "inputs": ["**/*", "!**/*.md", ".env"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,                     // 캐싱 비활성화
      "persistent": true                  // 장기 실행 프로세스
    },
    "lint": {},
    "format": {},
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "storybook": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**캐싱 전략**:
- `build`: 증분 빌드 캐싱 활성화 (dist/, .next/)
- `dev`, `storybook`: 캐시 비활성화 (watch 모드)
- `lint`, `format`: 캐시 활성화 (빠른 재검사)

---

## 주요 설정 파일 위치

### Root
- `/Users/kimbohyeon/interview/package.json`: 루트 스크립트, devDependencies
- `/Users/kimbohyeon/interview/turbo.json`: Turborepo 설정
- `/Users/kimbohyeon/interview/biome.json`: Biome 린터/포맷터
- `/Users/kimbohyeon/interview/pnpm-workspace.yaml`: pnpm workspace
- `/Users/kimbohyeon/interview/CLAUDE.md`: Claude Code 가이드

### Frontend
- `/Users/kimbohyeon/interview/apps/frontend/next.config.ts`
- `/Users/kimbohyeon/interview/apps/frontend/tsconfig.json`
- `/Users/kimbohyeon/interview/apps/frontend/package.json`

### Backend
- `/Users/kimbohyeon/interview/apps/backend/nest-cli.json`
- `/Users/kimbohyeon/interview/apps/backend/tsconfig.json`
- `/Users/kimbohyeon/interview/apps/backend/package.json`

### UI
- `/Users/kimbohyeon/interview/packages/ui/vite.config.js`
- `/Users/kimbohyeon/interview/packages/ui/.storybook/main.ts`
- `/Users/kimbohyeon/interview/packages/ui/package.json`

### Shared
- `/Users/kimbohyeon/interview/packages/shared/tsup.config.ts`
- `/Users/kimbohyeon/interview/packages/shared/package.json`

---

## 실용적 가이드

### 언제 어느 워크스페이스를 사용할 것인가?

**UI 패키지 사용**:
- ✅ 버튼, 입력 필드, 아이콘 등 범용 컴포넌트
- ✅ 타이포그래피 스타일
- ✅ 디자인 시스템 토큰
- ❌ 비즈니스 로직 포함 컴포넌트

**Shared 패키지 사용**:
- ✅ 순수 함수 유틸리티
- ✅ 공통 타입 정의
- ✅ 상수
- ❌ UI 컴포넌트
- ❌ 프레임워크 특화 로직

**Frontend 앱**:
- ✅ 페이지 컴포넌트
- ✅ 비즈니스 로직 컴포넌트
- ✅ API 호출
- ✅ 라우팅

**Backend 앱**:
- ✅ REST API 엔드포인트
- ✅ 데이터베이스 로직
- ✅ 인증/인가
- ✅ 비즈니스 로직

---

### 워크스페이스 간 코드 공유 방법

1. **UI 컴포넌트 공유** (ui → frontend):
```typescript
// packages/ui/src/components/atoms/Button/index.tsx
export default Button;

// apps/frontend/src/app/page.tsx
import { Atom } from '@interview-lab/ui';
<Atom.Button>Click</Atom.Button>
```

2. **유틸리티 공유** (shared → ui/frontend/backend):
```typescript
// packages/shared/src/utils/mergeClassnames.ts
export const mergeClassnames = (...args) => { ... };

// packages/ui/src/components/atoms/Badge/index.tsx
import { mergeClassnames } from '@interview-lab/shared';
```

3. **타입 공유** (shared → frontend/backend):
```typescript
// packages/shared/src/types/user.ts
export type User = { id: string; name: string };

// apps/backend/src/user/user.service.ts
import type { User } from '@interview-lab/shared';
```

---

### 빌드 순서 이해하기

Turborepo는 의존성 그래프를 기반으로 자동으로 빌드 순서를 결정합니다:

```
1. packages/typescript-config (설정 파일, 빌드 불필요)
2. packages/shared (CJS + ESM 빌드)
3. packages/ui (ESM + UMD 빌드, shared 의존)
4. apps/frontend (Next.js 빌드, ui + shared 의존)
   apps/backend (NestJS 빌드, shared 의존) [병렬]
```

**명령어**:
```bash
# 전체 빌드 (순서 자동 결정)
pnpm build

# 특정 워크스페이스만 빌드 (의존성 자동 빌드)
pnpm build --filter=@interview-lab/frontend

# 캐시 무시하고 재빌드
pnpm build --force
```

---

## 주요 패턴 요약

### 1. 스타일 작성 패턴
- **항상 theme.css.ts 토큰 사용** (하드코딩 금지)
- **styleVariants로 변형 관리**
- **base 스타일 재사용**

### 2. 컴포넌트 작성 패턴
- **HTML 속성 상속** (HTMLAttributes, InputHTMLAttributes)
- **mergeClassnames로 스타일 병합**
- **제네릭으로 타입 안전성 확보**

### 3. Export 패턴
- **default export** (개별 컴포넌트)
- **named export** (배럴 파일에서 객체로 그룹화)
- **배럴 파일** (index.ts)로 계층 구조화

### 4. 테스트 패턴
- **Backend**: Jest (단위 + E2E)
- **UI**: Vitest + Playwright (브라우저 테스트)
- **Storybook**: 시각적 테스트

---

## 버전 요구사항

- **Node.js**: >= 22
- **pnpm**: >= 9.0.0 (엄격히 고정)
- **TypeScript**: 5.9.3 (루트), 워크스페이스별로 다름
- **React**: 19
- **Next.js**: 16
- **NestJS**: 11

---

이 메모리를 통해 Serena는 프로젝트 구조, 워크스페이스 역할, UI 컴포넌트 라이브러리 구조, 아키텍처 원칙을 이해하고, 코드 작성 시 적절한 패턴을 따를 수 있습니다.