---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

변경사항을 기반으로 Conventional Commits 규격을 준수하는 단일 커밋을 생성하세요.
커밋하기 전에 `pnpm format`을 실행하세요.

### 커밋 메시지 구조

```
<타입>[적용 범위]: <설명>

[본문]

[꼬리말]
```

### 타입 (Type)

상황에 맞는 타입을 선택하세요:

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락, 컴포넌트 스타일등
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드, 패키지 매니저 설정
- `perf`: 성능 개선
- `ci`: CI 설정 파일 수정
- `build`: 빌드 시스템 수정

### 한글 커밋 메시지 작성 규칙

1. **제목 (필수)**
   - 타입과 설명을 한 줄로 작성
   - 설명은 한글로 작성하며 25자 이내 권장
   - 마침표(`.`) 사용 금지
   - "~하다" 형태 또는 명사형으로 작성
   - 예: `feat: 사용자 프로필 업로드 기능 추가`

2. **적용 범위 (선택)**
   - 변경 영향을 받는 컴포넌트나 모듈명
   - 예: `feat(auth): 로그인 세션 타임아웃 구현`

3. **본문 (선택)**
   - 제목 다음 빈 줄 추가 후 작성
   - "무엇을" 변경했는지, "왜" 변경했는지 설명
   - 36자 정도마다 줄바꿈 권장
   - 어떻게(how)보다 무엇(what)과 왜(why)에 집중

4. **꼬리말 (선택)**
   - Breaking changes, 이슈 참조 등
   - 형식: `키워드: 설명` 또는 `키워드 #이슈번호`
   - 예외: `🤖 Generated with [Claude Code](https://claude.com/claude-code) Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>` 은 포함하지 않기

### Breaking Changes 표기

호환성을 깨는 변경사항은 다음 중 하나로 표시:

1. 타입 뒤에 느낌표 추가:
   ```
   feat!: API 응답 형식 변경
   ```

2. 꼬리말 사용:
   ```
   feat: API 응답 형식 변경

   BREAKING CHANGE: JSON 응답 구조가 {data: ...}에서 {result: ...}로 변경됨
   ```

### GitHub 이슈 자동 종료

커밋 메시지에 다음 키워드를 사용하여 이슈를 자동으로 종료할 수 있습니다:

- **일반 이슈**: `close`, `closes`, `closed`
- **버그 이슈**: `fix`, `fixes`, `fixed`
- **문의/요청**: `resolve`, `resolves`, `resolved`

사용법: `키워드 #이슈번호`

예시:
- `fix: 로그인 버튼 클릭 시 오류 수정 (fixes #123)`
- `feat(ui): 다크모드 추가\n\ncloses #45, closes #67`

### 커밋 메시지 예시

**간단한 커밋 (제목만):**
```
feat: 회원가입 폼 유효성 검사 추가
fix: 프로필 이미지 업로드 오류 수정
docs: README에 설치 가이드 추가
```

**복잡한 커밋 (본문 포함):**
```
feat(auth): JWT 기반 인증 시스템 구현

기존 세션 기반 인증을 JWT로 전환하여
stateless 아키텍처를 구현했습니다.

- AccessToken 15분, RefreshToken 7일 유효
- Redis에 RefreshToken 저장
- 토큰 갱신 API 추가
```

**Breaking change 커밋:**
```
feat(api)!: 사용자 API 응답 형식 변경

BREAKING CHANGE: /api/users 엔드포인트의 응답이
{users: [...]} 형식에서 {data: [...], meta: {...}}
형식으로 변경되었습니다.
```

**이슈 연동 커밋:**
```
fix: 장바구니 수량 업데이트 버그 수정

수량 변경 시 DB 업데이트가 누락되던 문제를
트랜잭션 처리로 해결했습니다.

fixes #42
```

위 규칙에 따라 현재 변경사항에 적합한 커밋 메시지를 작성하고 커밋을 생성하세요.