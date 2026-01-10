# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

이 문서는 Claude Code가 이 프로젝트에서 작업할 때 참고하는 가이드입니다.

## 코드 탐색 및 분석

### Serena 플러그인 우선 사용

파일 탐색, 코드 탐색, 프로젝트 구조 파악 시 **Serena MCP 플러그인을 우선적으로 사용**하세요.

#### Serena를 사용해야 하는 경우

1. **프로젝트 구조 파악**
   - 전체 파일 구조 탐색
   - 디렉토리 내용 확인
   - 파일 검색

2. **코드 분석**
   - 파일의 심볼(함수, 클래스, 타입 등) 개요 확인
   - 특정 심볼 찾기 및 읽기
   - 심볼 간 참조 관계 파악

3. **코드 수정**
   - 심볼 단위 코드 교체
   - 특정 위치에 코드 삽입
   - 심볼 이름 변경

#### 주요 Serena 도구

```typescript
// 디렉토리 구조 탐색
mcp__plugin_serena_serena__list_dir

// 파일 검색 (파일명 substring matching)
mcp__plugin_serena_serena__find_file

// 패턴 검색 (정규식)
mcp__plugin_serena_serena__search_for_pattern

// 파일의 심볼 개요 확인 (전체 읽기 없이)
mcp__plugin_serena_serena__get_symbols_overview

// 특정 심볼 찾기
mcp__plugin_serena_serena__find_symbol

// 심볼을 참조하는 곳 찾기
mcp__plugin_serena_serena__find_referencing_symbols

// 심볼 본문 교체
mcp__plugin_serena_serena__replace_symbol_body

// 심볼 뒤에 코드 삽입
mcp__plugin_serena_serena__insert_after_symbol

// 심볼 앞에 코드 삽입
mcp__plugin_serena_serena__insert_before_symbol

// 심볼 이름 변경
mcp__plugin_serena_serena__rename_symbol
```

#### Serena vs 일반 도구

| 작업 | 일반 도구 | Serena (권장) |
|------|----------|--------------|
| 파일 구조 확인 | Bash(ls), Glob | `list_dir` |
| 파일 검색 | Glob, Grep | `find_file` |
| 코드 검색 | Grep | `search_for_pattern` |
| 파일 내용 확인 | Read (전체) | `get_symbols_overview` (심볼만) |
| 함수/클래스 찾기 | Grep + Read | `find_symbol` (직접 접근) |
| 코드 수정 | Edit (문자열 매칭) | `replace_symbol_body` (심볼 단위) |
| 참조 찾기 | Grep 반복 | `find_referencing_symbols` |

#### Serena 사용의 장점

- ✅ **효율성**: 파일 전체를 읽지 않고 필요한 심볼만 분석
- ✅ **정확성**: 텍스트 기반이 아닌 구조 기반 분석
- ✅ **속도**: 대규모 코드베이스에서 빠른 탐색
- ✅ **관계 파악**: 심볼 간 참조 관계 자동 추적
- ✅ **타입 인식**: TypeScript/JavaScript 타입 정보 활용

#### 사용 예시

```typescript
// 나쁜 예: 파일 전체를 읽음
Read('packages/ui/src/components/Button/index.tsx')

// 좋은 예: 심볼 개요만 확인
mcp__plugin_serena_serena__get_symbols_overview({
  relative_path: 'packages/ui/src/components/Button/index.tsx',
  depth: 1
})

// 나쁜 예: Grep으로 함수 찾고 Read로 읽음
Grep('function Button') -> Read(찾은 파일)

// 좋은 예: 심볼 직접 찾기
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Button',
  include_body: true
})
```

### 일반 도구 사용 시점

다음 경우에만 일반 도구 사용:

- 단순 파일 읽기 (설정 파일, 마크다운 등)
- 텍스트 기반 작업 (로그 분석, 문서 수정)
- Serena가 지원하지 않는 언어
- 파일 시스템 조작 (파일 생성, 삭제, 이동)

## 프로젝트 활성화

작업 시작 시 Serena 프로젝트 활성화:

```typescript
mcp__plugin_serena_serena__activate_project({
  project: '/Users/kimbohyeon/interview'
})
```

## 기타 가이드라인

- 코드 수정 전 항상 심볼 개요 확인
- 리팩토링 시 `find_referencing_symbols`로 영향 범위 파악
- 대규모 파일은 심볼 단위로 점진적으로 분석
- 불필요한 전체 파일 읽기 지양

## Serena 메모리 관리

프로젝트의 중요한 정보를 Serena 메모리에 저장하여 향후 작업에서 활용할 수 있습니다.

### 메모리 업데이트가 필요한 경우

다음과 같은 변경이 발생하면 관련 메모리를 업데이트하세요:

1. **프로젝트 구조 변경**
   - 새로운 디렉토리/패키지 추가
   - 기존 구조 변경 또는 이동
   - 주요 설정 파일 변경

2. **코드 아키텍처 변경**
   - 새로운 패턴 도입
   - 주요 모듈/서비스 추가
   - 의존성 관계 변경

3. **개발 환경 변경**
   - 빌드/실행 명령어 변경
   - 환경 변수 추가/수정
   - 개발 도구 설정 변경

### 메모리 관리 도구

```typescript
// 메모리 목록 조회
mcp__plugin_serena_serena__list_memories

// 메모리 저장 (의미 있는 파일명 사용)
mcp__plugin_serena_serena__write_memory({
  memory_file_name: 'project-structure.md',
  content: '...'
})

// 메모리 읽기
mcp__plugin_serena_serena__read_memory({
  memory_file_name: 'project-structure.md'
})

// 메모리 수정
mcp__plugin_serena_serena__edit_memory({
  memory_file_name: 'project-structure.md',
  needle: '기존 내용',
  repl: '새 내용',
  mode: 'literal'
})

// 메모리 삭제 (사용자 요청 시에만)
mcp__plugin_serena_serena__delete_memory({
  memory_file_name: 'project-structure.md'
})
```

### 메모리 파일 명명 규칙

- 의미 있는 이름 사용: `project-structure.md`, `api-patterns.md`
- kebab-case 사용
- `.md` 확장자 사용
- 내용을 유추할 수 있는 이름 선택

### 메모리 업데이트 워크플로우

1. 작업 완료 후 변경 사항이 프로젝트에 중요한지 평가
2. 기존 관련 메모리가 있는지 `list_memories`로 확인
3. 있으면 `edit_memory`로 수정, 없으면 `write_memory`로 생성
4. 더 이상 유효하지 않은 정보는 사용자 동의 후 삭제

---

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

## 스타일링 시스템

### Vanilla Extract

모든 스타일은 Vanilla Extract (CSS-in-TypeScript)를 사용합니다.

**Theme 토큰**: `packages/ui/src/styles/theme.css.ts`에 중앙화된 디자인 토큰 정의
- `vars.color.*`: 색상 (blue, gray, green, orange, disabled, border)
- `vars.fontSize.*`: 폰트 크기
- `vars.fontWeight.*`: 폰트 굵기
- `vars.spacing.*`: 간격
- `vars.radius.*`: 테두리 반경
- `vars.shadow.*`: 그림자
- `vars.font.pretendard`: Pretendard 폰트

**스타일 파일 패턴**:
```typescript
// component.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const componentStyle = style({
  color: vars.color.blue,
  fontSize: vars.fontSize.sizeSm,
  // ...
});
```

**컴포넌트에서 사용**:
```typescript
import { componentStyle } from './component.css';
import { mergeClassnames } from '@interview-lab/shared';

<div className={mergeClassnames(componentStyle, className)} />
```

### UI 컴포넌트 작성 규칙

1. **Props 타입**: `InputHTMLAttributes`, `ButtonHTMLAttributes` 등 HTML 기본 속성 상속
2. **조건부 스타일**: 별도 스타일 상수로 분리하여 `mergeClassnames`로 조합
3. **Storybook 스토리**: 모든 컴포넌트에 `.stories.ts` 파일 작성
4. **Atomic Design**: atoms, molecules, organisms 폴더 구조 준수

## 코드 품질

### Biome

이 프로젝트는 ESLint/Prettier 대신 Biome를 사용합니다.

**설정** (`biome.json`):
- Tab indentation (width 2)
- Single quotes for JavaScript
- Line width: 80
- Import 자동 정렬
- VCS (Git) 통합

**커밋 전 항상 포맷팅 실행**:
```bash
pnpm format
```

### TypeScript

- Node.js >= 22 필요
- 모든 패키지는 100% TypeScript
- Strict 모드 활성화

## Git 워크플로우

### Conventional Commits

커밋 메시지는 Conventional Commits 규격 준수:

```
<타입>[적용 범위]: <설명>

[본문]
```

**타입**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 스타일 변경 (코드 포맷팅, 컴포넌트 스타일 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 변경

**적용 범위 예시**: `ui`, `frontend`, `backend`, `shared`

**예시**:
```
feat(ui): Input 컴포넌트 추가
fix(backend): 사용자 인증 버그 수정
style(ui): Button 컴포넌트 스타일 개선
```

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
