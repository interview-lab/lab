# MCP 서버 상세 가이드

이 문서는 프로젝트에서 사용 가능한 MCP (Model Context Protocol) 서버와 도구의 상세 사용법을 설명합니다.

---

## Serena MCP 서버

**목적**: 심볼 기반 코드 탐색 및 수정

**사용 원칙**: 코드 작업 시 Serena를 우선적으로 사용하여 효율성, 정확성, 속도를 확보합니다.

---

### 프로젝트 활성화

**도구**: `activate_project`

작업 시작 시 반드시 프로젝트를 활성화해야 합니다:

```typescript
mcp__plugin_serena_serena__activate_project({
  project: '/Users/kimbohyeon/interview'
})
```

---

### 파일 시스템 탐색

#### 1. list_dir - 디렉토리 구조 탐색

**용도**: 디렉토리 내 파일 및 하위 디렉토리 목록 확인

**사용 예제**:
```typescript
// 루트 디렉토리 탐색
mcp__plugin_serena_serena__list_dir({
  relative_path: '.'
})

// 특정 디렉토리 탐색
mcp__plugin_serena_serena__list_dir({
  relative_path: 'packages/ui/src/components'
})

// 특정 depth까지만 탐색
mcp__plugin_serena_serena__list_dir({
  relative_path: 'apps',
  depth: 2
})
```

**언제 사용하는가?**
- ✅ 프로젝트 구조 파악
- ✅ 특정 디렉토리의 파일 목록 확인
- ✅ 새 파일을 어디에 추가할지 결정
- ❌ 파일 내용 확인 (read_file 또는 get_symbols_overview 사용)

---

#### 2. find_file - 파일 검색

**용도**: 파일명으로 파일 찾기 (substring matching)

**사용 예제**:
```typescript
// 파일명에 "Button"이 포함된 모든 파일
mcp__plugin_serena_serena__find_file({
  file_name_pattern: 'Button'
})

// 특정 디렉토리 내에서만 검색
mcp__plugin_serena_serena__find_file({
  file_name_pattern: 'Input',
  relative_path: 'packages/ui'
})

// 특정 확장자만 검색
mcp__plugin_serena_serena__find_file({
  file_name_pattern: '*.tsx',
  relative_path: 'apps/frontend/src'
})
```

**언제 사용하는가?**
- ✅ 파일 위치를 모를 때
- ✅ 비슷한 이름의 파일들 찾기
- ❌ 파일 내용으로 검색 (search_for_pattern 사용)

---

#### 3. search_for_pattern - 정규식 패턴 검색

**용도**: 코드 내용에서 정규식 패턴 검색

**사용 예제**:
```typescript
// "mergeClassnames" 함수 사용처 찾기
mcp__plugin_serena_serena__search_for_pattern({
  pattern: 'mergeClassnames'
})

// 정규식으로 검색 (모든 useState 호출)
mcp__plugin_serena_serena__search_for_pattern({
  pattern: 'useState\\<.*\\>'
})

// 특정 디렉토리 내에서만 검색
mcp__plugin_serena_serena__search_for_pattern({
  pattern: 'IconSearch',
  relative_path: 'packages/ui/src'
})

// 특정 파일만 검색
mcp__plugin_serena_serena__search_for_pattern({
  pattern: 'Button',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx'
})
```

**언제 사용하는가?**
- ✅ 특정 함수/변수 사용처 찾기
- ✅ 패턴 매칭 (정규식)
- ✅ 리팩토링 전 영향 범위 파악
- ❌ 심볼 간 참조 관계 (find_referencing_symbols 사용)

---

### 코드 분석

#### 4. read_file - 파일 읽기

**용도**: 파일 전체 내용 읽기

**사용 예제**:
```typescript
// 파일 전체 읽기
mcp__plugin_serena_serena__read_file({
  relative_path: 'packages/shared/src/utils/mergeClassnames.ts'
})

// 특정 줄 범위만 읽기
mcp__plugin_serena_serena__read_file({
  relative_path: 'packages/ui/src/styles/theme.css.ts',
  start_line: 1,
  end_line: 50
})
```

**언제 사용하는가?**
- ✅ 설정 파일 읽기 (package.json, tsconfig.json)
- ✅ 마크다운 문서 읽기 (README.md, CLAUDE.md)
- ✅ 작은 파일 전체 읽기
- ❌ 큰 파일의 특정 함수만 확인 (get_symbols_overview 또는 find_symbol 사용)

---

#### 5. get_symbols_overview - 심볼 개요 확인

**용도**: 파일 전체를 읽지 않고 심볼(함수, 클래스, 타입) 목록만 확인

**사용 예제**:
```typescript
// 파일의 모든 top-level 심볼 확인
mcp__plugin_serena_serena__get_symbols_overview({
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  depth: 0  // top-level만
})

// 클래스 내부 메서드까지 확인
mcp__plugin_serena_serena__get_symbols_overview({
  relative_path: 'apps/backend/src/app.service.ts',
  depth: 1  // 1단계 depth
})

// 전체 심볼 트리 확인
mcp__plugin_serena_serena__get_symbols_overview({
  relative_path: 'packages/ui/src/components/typographies/Title/index.tsx',
  depth: 2
})
```

**언제 사용하는가?**
- ✅ 파일 구조 파악 (어떤 함수/클래스가 있는지)
- ✅ 큰 파일에서 특정 함수만 찾을 때
- ✅ 코드 수정 전 구조 확인
- ❌ 함수 본문 확인 (find_symbol with include_body: true)

**좋은 예**:
```typescript
// ❌ 나쁜 예: 파일 전체를 읽음
Read('packages/ui/src/components/atoms/Badge/index.tsx')

// ✅ 좋은 예: 심볼 개요만 확인
mcp__plugin_serena_serena__get_symbols_overview({
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  depth: 1
})
```

---

#### 6. find_symbol - 특정 심볼 찾기

**용도**: 이름으로 특정 심볼 찾기 (함수, 클래스, 타입 등)

**사용 예제**:
```typescript
// 심볼 이름으로 찾기 (본문 포함)
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Badge',
  include_body: true
})

// 클래스 내부 메서드 찾기
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'AppService/getHello',
  include_body: true
})

// 심볼 목록만 (본문 제외)
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Title',
  include_body: false,
  depth: 1  // Title의 1단계 내부 심볼만
})

// 특정 파일에서만 검색
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Button',
  relative_path: 'packages/ui/src/components/atoms',
  include_body: true
})

// 패턴 매칭 (모든 Icon으로 시작하는 심볼)
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Icon*',
  include_body: false
})
```

**name_path_pattern 이해하기**:
```
TitleProps              → 타입 TitleProps 찾기
Title                   → Title 함수/클래스 찾기
Title/*                 → Title 내부 모든 심볼
AppService/getHello     → AppService 클래스의 getHello 메서드
Title/__init__          → Title 클래스 생성자 (Python)
```

**언제 사용하는가?**
- ✅ 특정 함수/클래스 구현 확인
- ✅ 리팩토링 대상 심볼 찾기
- ✅ 타입 정의 확인
- ❌ 파일 구조만 확인 (get_symbols_overview 사용)

**좋은 예**:
```typescript
// ❌ 나쁜 예: Grep으로 함수 찾고 Read로 읽음
Grep('function Button') -> Read(찾은 파일)

// ✅ 좋은 예: 심볼 직접 찾기
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Button',
  include_body: true
})
```

---

#### 7. find_referencing_symbols - 심볼 참조 찾기

**용도**: 특정 심볼을 참조하는 모든 곳 찾기

**사용 예제**:
```typescript
// mergeClassnames를 사용하는 모든 곳 찾기
mcp__plugin_serena_serena__find_referencing_symbols({
  symbol_identifier: 'mergeClassnames',
  relative_path: 'packages/shared/src/utils/mergeClassnames.ts'
})

// Badge 컴포넌트를 사용하는 모든 곳
mcp__plugin_serena_serena__find_referencing_symbols({
  symbol_identifier: 'Badge',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx'
})

// 특정 타입을 사용하는 곳 찾기
mcp__plugin_serena_serena__find_referencing_symbols({
  symbol_identifier: 'BadgeProps',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx'
})
```

**언제 사용하는가?**
- ✅ 리팩토링 시 영향 범위 파악
- ✅ 함수/타입 변경 전 사용처 확인
- ✅ 심볼 이름 변경 전 모든 참조 찾기
- ✅ 의존성 분석
- ❌ 텍스트 기반 검색 (search_for_pattern 사용)

**리팩토링 워크플로우**:
```typescript
// 1. 변경하려는 심볼 찾기
mcp__plugin_serena_serena__find_symbol({
  name_path_pattern: 'Button',
  include_body: true
})

// 2. 참조하는 곳 모두 찾기
mcp__plugin_serena_serena__find_referencing_symbols({
  symbol_identifier: 'Button',
  relative_path: 'packages/ui/src/components/typographies/Button/index.tsx'
})

// 3. 심볼 이름 변경 (모든 참조도 자동 업데이트)
mcp__plugin_serena_serena__rename_symbol({
  symbol_identifier: 'Button',
  relative_path: 'packages/ui/src/components/typographies/Button/index.tsx',
  new_symbol_name: 'ButtonText'
})
```

---

### 코드 수정

#### 8. replace_symbol_body - 심볼 본문 교체

**용도**: 함수, 클래스, 타입 등 심볼 전체를 새 코드로 교체

**사용 예제**:
```typescript
// Badge 컴포넌트 구현 교체
mcp__plugin_serena_serena__replace_symbol_body({
  symbol_identifier: 'Badge',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  new_body: `const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span className={mergeClassnames(badgeStyle, className)} {...props}>
      {children}
    </span>
  );
};`
})

// 타입 정의 교체
mcp__plugin_serena_serena__replace_symbol_body({
  symbol_identifier: 'BadgeProps',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  new_body: `type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};`
})

// 함수 전체 교체
mcp__plugin_serena_serena__replace_symbol_body({
  symbol_identifier: 'mergeClassnames',
  relative_path: 'packages/shared/src/utils/mergeClassnames.ts',
  new_body: `export const mergeClassnames = (...classnames: Array<string | undefined | null | false>) => {
  return classnames.filter(Boolean).join(' ');
};`
})
```

**언제 사용하는가?**
- ✅ 함수/클래스 전체를 다시 작성
- ✅ 타입 정의 변경
- ✅ 큰 리팩토링 (심볼 단위)
- ❌ 몇 줄만 수정 (replace_content 사용)

---

#### 9. replace_content - 텍스트 기반 교체

**용도**: 파일 내 특정 텍스트를 정규식으로 교체

**사용 예제**:
```typescript
// 간단한 문자열 교체
mcp__plugin_serena_serena__replace_content({
  relative_path: 'packages/ui/src/components/atoms/Badge/badge.css.ts',
  old_content: 'minHeight: 22',
  new_content: 'minHeight: 24'
})

// 정규식 교체 (모든 vars.color.blue를 vars.color.green으로)
mcp__plugin_serena_serena__replace_content({
  relative_path: 'packages/ui/src/components/atoms/Badge/badge.css.ts',
  old_content: 'vars\\.color\\.blue',
  new_content: 'vars.color.green',
  is_regex: true
})

// 여러 줄 교체
mcp__plugin_serena_serena__replace_content({
  relative_path: 'packages/ui/src/components/atoms/Input/index.tsx',
  old_content: `const Input = ({ icon, ...props }) => {
  return <input {...props} />;
};`,
  new_content: `const Input = ({ icon, className, ...props }) => {
  return <input className={mergeClassnames(inputStyle, className)} {...props} />;
};`
})
```

**언제 사용하는가?**
- ✅ 몇 줄만 수정 (심볼 전체 교체는 비효율)
- ✅ 정규식 패턴 매칭 교체
- ✅ 빠른 수정 (import 추가, 단일 라인 변경 등)
- ❌ 함수/클래스 전체 교체 (replace_symbol_body 사용)

---

#### 10. insert_after_symbol - 심볼 뒤에 코드 삽입

**용도**: 특정 심볼 다음에 새 코드 추가

**사용 예제**:
```typescript
// Badge 컴포넌트 다음에 Button 컴포넌트 추가
mcp__plugin_serena_serena__insert_after_symbol({
  symbol_identifier: 'Badge',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  code_to_insert: `

export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};`
})

// 파일 끝에 새 함수 추가 (마지막 심볼 뒤)
mcp__plugin_serena_serena__insert_after_symbol({
  symbol_identifier: 'mergeClassnames',  // 마지막 심볼
  relative_path: 'packages/shared/src/utils/mergeClassnames.ts',
  code_to_insert: `

export const cn = mergeClassnames;  // 별칭`
})
```

**언제 사용하는가?**
- ✅ 파일에 새 함수/타입 추가
- ✅ export 추가
- ✅ 파일 끝에 코드 추가
- ❌ 파일 시작 부분에 추가 (insert_before_symbol 사용)

---

#### 11. insert_before_symbol - 심볼 앞에 코드 삽입

**용도**: 특정 심볼 앞에 새 코드 추가

**사용 예제**:
```typescript
// Badge 컴포넌트 앞에 타입 정의 추가
mcp__plugin_serena_serena__insert_before_symbol({
  symbol_identifier: 'Badge',
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  code_to_insert: `type BadgeVariant = 'primary' | 'secondary';

`
})

// 파일 시작 부분에 import 추가 (첫 번째 심볼 앞)
mcp__plugin_serena_serena__insert_before_symbol({
  symbol_identifier: 'Badge',  // 첫 번째 심볼
  relative_path: 'packages/ui/src/components/atoms/Badge/index.tsx',
  code_to_insert: `import { vars } from '@/styles/theme.css';
`
})
```

**언제 사용하는가?**
- ✅ 파일 시작 부분에 코드 추가 (import 등)
- ✅ 특정 심볼 앞에 관련 코드 추가
- ❌ 파일 끝에 추가 (insert_after_symbol 사용)

---

#### 12. rename_symbol - 심볼 이름 변경

**용도**: 심볼 이름 변경 + 모든 참조 자동 업데이트

**사용 예제**:
```typescript
// Button을 ButtonText로 이름 변경 (모든 참조도 자동 업데이트)
mcp__plugin_serena_serena__rename_symbol({
  symbol_identifier: 'Button',
  relative_path: 'packages/ui/src/components/typographies/Button/index.tsx',
  new_symbol_name: 'ButtonText'
})

// 타입 이름 변경
mcp__plugin_serena_serena__rename_symbol({
  symbol_identifier: 'ButtonProps',
  relative_path: 'packages/ui/src/components/typographies/Button/index.tsx',
  new_symbol_name: 'ButtonTextProps'
})
```

**언제 사용하는가?**
- ✅ 심볼 이름 변경 (함수, 클래스, 타입, 변수)
- ✅ 리팩토링 (이름 통일)
- ✅ 모든 참조를 자동으로 업데이트해야 할 때
- ❌ 파일 이름 변경 (파일 시스템 명령 사용)

---

### 메모리 관리

#### 13. write_memory - 메모리 작성

**용도**: 프로젝트 관련 정보를 메모리로 저장

**사용 예제**:
```typescript
mcp__plugin_serena_serena__write_memory({
  memory_file_name: 'project_structure',
  content: `# 프로젝트 구조

...프로젝트 구조 설명...`
})
```

---

#### 14. read_memory - 메모리 읽기

**용도**: 저장된 메모리 읽기

**사용 예제**:
```typescript
mcp__plugin_serena_serena__read_memory({
  memory_file_name: 'project_structure'
})
```

---

#### 15. list_memories - 메모리 목록

**용도**: 사용 가능한 메모리 파일 목록 확인

**사용 예제**:
```typescript
mcp__plugin_serena_serena__list_memories()
```

---

## Context7 MCP 서버

**목적**: 라이브러리 최신 문서 검색

---

### 1. resolve-library-id - 라이브러리 ID 확인

**용도**: 라이브러리 이름 → ID 변환

**사용 예제**:
```typescript
mcp__plugin_context7_context7__resolve-library-id({
  library: 'react'
})

mcp__plugin_context7_context7__resolve-library-id({
  library: 'next.js'
})
```

---

### 2. query-docs - 문서 검색

**용도**: 라이브러리 문서에서 정보 검색

**사용 예제**:
```typescript
// React 19의 use() hook 사용법
mcp__plugin_context7_context7__query-docs({
  library_id: 'react',
  query: 'use hook'
})

// Next.js 16 App Router dynamic routes
mcp__plugin_context7_context7__query-docs({
  library_id: 'next.js',
  query: 'app router dynamic routes'
})

// Vanilla Extract styleVariants 사용법
mcp__plugin_context7_context7__query-docs({
  library_id: 'vanilla-extract',
  query: 'styleVariants'
})

// NestJS ConfigModule 설정
mcp__plugin_context7_context7__query-docs({
  library_id: 'nestjs',
  query: 'ConfigModule'
})
```

**언제 사용하는가?**
- ✅ 라이브러리 사용법 확인
- ✅ 최신 API 문서 확인
- ✅ 코드 예제 찾기
- ❌ 프로젝트 코드 분석 (Serena 사용)

---

## Playwright MCP 서버

**목적**: 브라우저 자동화 및 UI 테스트

---

### 주요 도구

#### 1. browser_navigate - 페이지 이동
```typescript
mcp__plugin_playwright_playwright__browser_navigate({
  url: 'http://localhost:3000'
})
```

#### 2. browser_click - 요소 클릭
```typescript
mcp__plugin_playwright_playwright__browser_click({
  selector: 'button[type="submit"]'
})
```

#### 3. browser_fill_form - 폼 입력
```typescript
mcp__plugin_playwright_playwright__browser_fill_form({
  selector: 'input[name="email"]',
  value: 'test@example.com'
})
```

#### 4. browser_take_screenshot - 스크린샷 캡처
```typescript
mcp__plugin_playwright_playwright__browser_take_screenshot({
  path: 'screenshot.png',
  full_page: true
})
```

#### 5. browser_console_messages - 콘솔 로그 수집
```typescript
mcp__plugin_playwright_playwright__browser_console_messages()
```

#### 6. browser_network_requests - 네트워크 요청 확인
```typescript
mcp__plugin_playwright_playwright__browser_network_requests()
```

---

### UI 테스트 시나리오 예제

```typescript
// 1. 페이지 이동
mcp__plugin_playwright_playwright__browser_navigate({
  url: 'http://localhost:3000'
})

// 2. 입력 필드 확인 및 입력
mcp__plugin_playwright_playwright__browser_fill_form({
  selector: 'input[placeholder="Email"]',
  value: 'user@example.com'
})

// 3. 버튼 클릭
mcp__plugin_playwright_playwright__browser_click({
  selector: 'button:has-text("Submit")'
})

// 4. 결과 확인 (스크린샷)
mcp__plugin_playwright_playwright__browser_take_screenshot({
  path: 'submit-result.png'
})

// 5. 콘솔 에러 확인
mcp__plugin_playwright_playwright__browser_console_messages()

// 6. 네트워크 요청 확인 (API 호출 여부)
mcp__plugin_playwright_playwright__browser_network_requests()
```

---

## Serena 사용 원칙 요약

### 1. 항상 Serena 우선

**코드 탐색 시**:
- ❌ `Glob` + `Read`: 파일 찾고 전체 읽기
- ✅ `find_file` + `get_symbols_overview`: 파일 찾고 심볼만 확인

**코드 분석 시**:
- ❌ `Read`: 파일 전체 읽기
- ✅ `get_symbols_overview`: 심볼 개요만
- ✅ `find_symbol`: 특정 심볼만

**코드 수정 시**:
- ❌ `Edit`: 텍스트 매칭으로 수정
- ✅ `replace_symbol_body`: 심볼 단위 수정
- ✅ `replace_content`: 몇 줄만 수정

**참조 찾기 시**:
- ❌ `Grep` 반복: 텍스트 검색 여러 번
- ✅ `find_referencing_symbols`: 모든 참조 한 번에

---

### 2. 단계적 접근

```
1. list_dir → 디렉토리 구조 파악
2. find_file → 관련 파일 찾기
3. get_symbols_overview → 심볼 개요 확인
4. find_symbol → 특정 심볼 상세 확인
5. find_referencing_symbols → 참조 관계 파악 (리팩토링 시)
6. replace_symbol_body / rename_symbol → 수정
```

---

### 3. 심볼 기반 사고

**심볼 단위로 생각하기**:
- 함수를 수정한다 = `replace_symbol_body`
- 클래스를 이름 변경한다 = `rename_symbol`
- 타입을 찾는다 = `find_symbol`

**심볼 간 관계 파악**:
- 이 함수를 누가 사용하는가? = `find_referencing_symbols`
- 이 클래스는 무엇을 사용하는가? = `find_symbol` + 본문 분석

---

### 4. 효율성 우선

**파일 전체 읽기를 피하기**:
- 10,000줄 파일 → `get_symbols_overview`로 100줄만 읽기
- 특정 함수 찾기 → `find_symbol`로 직접 접근

**심볼 단위 수정**:
- 함수 1개 수정 → `replace_symbol_body` (정확)
- 파일 전체 수정 → `replace_content` (위험)

---

## 비교표: Serena vs 일반 도구

| 작업 | 일반 도구 | Serena | 효율성 |
|------|----------|--------|--------|
| 디렉토리 탐색 | `Bash(ls -la)` | `list_dir` | 동일 |
| 파일 검색 | `Glob('**/*.tsx')` | `find_file` | 더 빠름 |
| 코드 검색 | `Grep('function')` | `search_for_pattern` | 동일 |
| 파일 구조 파악 | `Read` (전체) | `get_symbols_overview` | **10배 빠름** |
| 함수 찾기 | `Grep` + `Read` | `find_symbol` | **3배 빠름** |
| 참조 찾기 | `Grep` 여러 번 | `find_referencing_symbols` | **5배 빠름** |
| 함수 수정 | `Edit` (문자열 매칭) | `replace_symbol_body` | **정확성 높음** |
| 이름 변경 | `Edit` 여러 번 | `rename_symbol` | **자동화** |

---

이 메모리를 통해 Serena는 MCP 도구를 효과적으로 사용하여 코드 탐색, 분석, 수정을 수행할 수 있습니다.