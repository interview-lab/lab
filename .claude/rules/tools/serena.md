## Serena MCP 플러그인 사용 가이드

### Serena를 사용해야 하는 경우

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

### 주요 Serena 도구

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

### Serena vs 일반 도구

| 작업 | 일반 도구 | Serena (권장) |
|------|----------|--------------|
| 파일 구조 확인 | Bash(ls), Glob | `list_dir` |
| 파일 검색 | Glob, Grep | `find_file` |
| 코드 검색 | Grep | `search_for_pattern` |
| 파일 내용 확인 | Read (전체) | `get_symbols_overview` (심볼만) |
| 함수/클래스 찾기 | Grep + Read | `find_symbol` (직접 접근) |
| 코드 수정 | Edit (문자열 매칭) | `replace_symbol_body` (심볼 단위) |
| 참조 찾기 | Grep 반복 | `find_referencing_symbols` |

### Serena 사용의 장점

- ✅ **효율성**: 파일 전체를 읽지 않고 필요한 심볼만 분석
- ✅ **정확성**: 텍스트 기반이 아닌 구조 기반 분석
- ✅ **속도**: 대규모 코드베이스에서 빠른 탐색
- ✅ **관계 파악**: 심볼 간 참조 관계 자동 추적
- ✅ **타입 인식**: TypeScript/JavaScript 타입 정보 활용

### 사용 예시

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

---

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
