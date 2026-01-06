# Claude 작업 가이드

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
