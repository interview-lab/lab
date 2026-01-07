# 커스텀 명령어 및 워크플로우

이 문서는 프로젝트 개발 워크플로우에서 사용되는 모든 명령어와 규칙을 정리합니다.

---

## 루트 레벨 명령어

### 개발 명령어

```bash
# 모든 워크스페이스 개발 서버 실행
pnpm dev

# 모든 워크스페이스 빌드
pnpm build

# 코드 린트 (Biome)
pnpm lint

# 코드 포맷팅 (Biome) - 커밋 전 필수!
pnpm format

# 타입 체크 (모든 워크스페이스)
pnpm check-types
```

**실행 흐름**:
- `pnpm dev`: Turborepo가 모든 워크스페이스의 `dev` 스크립트를 병렬로 실행
  - frontend: Next.js 개발 서버 (http://localhost:3000)
  - backend: NestJS watch 모드 (http://localhost:8080)
  - ui: Vite watch 모드 (빌드)

- `pnpm build`: 의존성 순서대로 빌드
  1. packages/shared (CJS + ESM)
  2. packages/ui (ESM + UMD + CSS)
  3. apps/frontend, apps/backend (병렬)

- `pnpm lint`: 모든 워크스페이스에서 Biome 린트 검사
  - 오류 발견 시 종료 코드 1 반환
  - CI/CD에서 자동 실행

- `pnpm format`: 코드 포맷팅 적용
  - **커밋 전 필수 실행!**
  - Tab 2칸, Single quotes, Line width 80
  - Import 자동 정렬
  - 변경된 파일만 수정

- `pnpm check-types`: TypeScript 타입 체크
  - 의존성 순서대로 실행
  - 컴파일 오류 검출

---

## Turborepo 필터 명령어

### 특정 워크스페이스만 실행

```bash
# Frontend만 개발 모드로 실행
pnpm dev --filter=@interview-lab/frontend

# UI 패키지만 빌드
pnpm build --filter=@interview-lab/ui

# Backend만 린트
pnpm lint --filter=@interview-lab/backend

# Shared만 타입 체크
pnpm check-types --filter=@interview-lab/shared
```

**필터 옵션**:
- `--filter=<package-name>`: 특정 패키지만 실행
- `--filter=<package-name>...`: 패키지와 의존하는 모든 패키지
- `--filter=...@interview-lab/ui`: UI에 의존하는 모든 패키지

**예제**:
```bash
# UI와 UI에 의존하는 패키지 모두 빌드 (ui + frontend)
pnpm build --filter=...@interview-lab/ui

# Frontend와 Frontend가 의존하는 패키지 모두 빌드 (shared + ui + frontend)
pnpm build --filter=@interview-lab/frontend...
```

---

## 워크스페이스별 명령어

### Frontend (apps/frontend)

```bash
cd apps/frontend

# 개발 서버 (http://localhost:3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작 (빌드 후)
pnpm start

# 린트
pnpm lint

# 타입 체크
pnpm check-types
```

**주요 사용 시나리오**:
1. **개발 시작**: `pnpm dev` → http://localhost:3000 접속
2. **배포 전**: `pnpm format` → `pnpm build` → `pnpm start`
3. **디버깅**: Next.js 에러는 터미널과 브라우저 모두 확인

---

### Backend (apps/backend)

```bash
cd apps/backend

# 개발 모드 (watch)
pnpm dev

# 디버그 모드
pnpm debug

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작 (빌드 후)
pnpm start

# 테스트
pnpm test              # 단위 테스트
pnpm test:watch        # watch 모드
pnpm test:cov          # 커버리지
pnpm test:e2e          # E2E 테스트
pnpm test:debug        # 디버그 모드

# 린트
pnpm lint

# 타입 체크
pnpm check-types
```

**주요 사용 시나리오**:
1. **개발 시작**: `pnpm dev` → http://localhost:8080 접속
2. **TDD**: `pnpm test:watch` → 코드 수정 → 자동 테스트
3. **E2E 테스트**: `pnpm test:e2e` → API 엔드포인트 검증
4. **디버깅**: `pnpm debug` → VSCode 디버거 연결

**환경 변수**:
- `PORT`: 서버 포트 (기본값: 8080)
- `.env` 파일 지원 (ConfigModule)

---

### UI 패키지 (packages/ui)

```bash
cd packages/ui

# Storybook 개발 서버 (http://localhost:6006)
pnpm storybook

# Storybook 정적 빌드
pnpm build-storybook

# 개발 모드 (watch 모드로 빌드)
pnpm dev

# 프로덕션 빌드 (ESM + UMD + CSS)
pnpm build

# 테스트 (Vitest + Playwright)
pnpm test

# 린트
pnpm lint

# 타입 체크
pnpm check-types
```

**주요 사용 시나리오**:
1. **컴포넌트 개발**: `pnpm storybook` → 컴포넌트 확인 및 수정
2. **빌드 테스트**: `pnpm build` → `dist/` 확인
3. **Frontend에서 사용**: `pnpm dev` (watch 모드) → Frontend 실시간 반영

**Storybook 사용법**:
```bash
# 1. Storybook 시작
pnpm storybook

# 2. 브라우저에서 http://localhost:6006 접속
# 3. 좌측 메뉴에서 컴포넌트 선택
# 4. 우측 Controls 패널에서 props 변경
# 5. 다양한 상태 확인
```

---

### Shared 패키지 (packages/shared)

```bash
cd packages/shared

# 개발 모드 (watch)
pnpm dev

# 프로덕션 빌드 (CJS + ESM)
pnpm build

# 린트
pnpm lint

# 타입 체크
pnpm check-types
```

---

## Git 워크플로우

### Conventional Commits 규칙

**커밋 메시지 구조**:
```
<타입>[적용 범위]: <설명>

[본문]
```

**타입**:
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 스타일 변경 (코드 포맷팅, 컴포넌트 스타일 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드, 패키지 매니저 설정

**적용 범위** (선택):
- `ui`: UI 패키지
- `frontend`: Frontend 앱
- `backend`: Backend 앱
- `shared`: Shared 패키지
- `biome`: Biome 설정
- `turbo`: Turborepo 설정

**예시**:
```bash
# 기본 커밋
feat(ui): Input 컴포넌트 추가
fix(backend): 사용자 인증 버그 수정
style(ui): Button 컴포넌트 스타일 개선
docs: CLAUDE.md 프로젝트 가이드 확장
chore(shared): mergeClassnames 유틸리티 추가
refactor(ui): Button을 ButtonText로 이름 변경

# 본문 포함 커밋
feat(ui): Input 및 InputWithValidation 컴포넌트 추가

Input 컴포넌트는 아이콘 지원 및 disabled 상태를 포함합니다.
InputWithValidation은 에러 상태와 메시지 표시 기능을 추가합니다.
```

---

### 커밋 워크플로우

#### 1. 변경 사항 확인
```bash
git status                    # 수정된 파일 확인
git diff                      # 변경 내용 확인
git diff --staged             # staged 변경 내용 확인
```

#### 2. 포맷팅 (필수!)
```bash
pnpm format                   # Biome 포맷팅 적용
```

#### 3. 스테이징
```bash
git add .                     # 모든 변경 사항 추가
git add packages/ui/          # 특정 디렉토리만
git add src/components/*.tsx  # 특정 패턴만
```

#### 4. 커밋
```bash
# 간단한 커밋
git commit -m "feat(ui): Badge 컴포넌트 추가"

# 본문 포함 커밋 (HEREDOC 사용)
git commit -m "$(cat <<'EOF'
feat(ui): Badge 컴포넌트 추가

라벨 및 상태 표시용 배지 컴포넌트를 추가했습니다.
- 둥근 테두리 (radius.full)
- HTML span 속성 모두 상속
- mergeClassnames로 커스텀 스타일 지원
EOF
)"
```

#### 5. 푸시
```bash
git push                      # 현재 브랜치 푸시
git push -u origin <branch>   # 새 브랜치 푸시
```

---

### Claude Code 스킬 사용

#### /commit - Git 커밋 생성
```bash
# 사용법
/commit

# 또는 메시지로
"커밋을 생성해줘"
"변경 사항을 커밋해줘"
```

**동작**:
1. `git status`, `git diff` 실행
2. 변경 사항 분석 및 커밋 메시지 생성 (Conventional Commits)
3. `pnpm format` 실행
4. `git commit` 실행
5. 커밋 성공 확인

---

#### /commit-push-pr - 커밋 + 푸시 + PR 생성
```bash
# 사용법
/commit-push-pr

# 또는 인자와 함께
/commit-push-pr "ui브랜치에서 develop 브랜치로의 PR을 생성해줘"
```

**동작**:
1. 변경 사항 분석
2. 커밋 생성 (Conventional Commits)
3. 원격 저장소에 푸시
4. GitHub PR 생성 (템플릿 사용)
5. PR URL 반환

**PR 템플릿**: `.github/PULL_REQUEST_TEMPLATE.md`
- 개요
- 유형 (체크리스트)
- 변경점
- 스크린샷
- PR Checklist

---

### 브랜치 전략

**브랜치 구조**:
```
main (프로덕션)
  ├── develop (개발)
  │   ├── feat/user-authentication
  │   ├── fix/login-bug
  │   └── refactor/ui-components
  └── ui (현재 작업 중)
```

**명명 규칙**:
- `feat/<feature-name>`: 새 기능
- `fix/<bug-name>`: 버그 수정
- `refactor/<refactor-name>`: 리팩토링
- `docs/<doc-name>`: 문서 작업

**작업 흐름**:
```bash
# 1. 새 브랜치 생성
git checkout -b feat/new-feature develop

# 2. 작업 및 커밋
# ... 코드 작성 ...
pnpm format
git commit -m "feat: 새 기능 추가"

# 3. 푸시 및 PR
git push -u origin feat/new-feature
gh pr create --base develop --head feat/new-feature

# 또는 스킬 사용
/commit-push-pr
```

---

## GitHub CLI (gh) 명령어

### PR 관리

```bash
# PR 생성 (대화형)
gh pr create

# PR 생성 (템플릿 사용)
gh pr create --base develop --head feat/new-feature --template .github/PULL_REQUEST_TEMPLATE.md

# PR 생성 (제목 + 본문)
gh pr create --base develop --head feat/new-feature --title "feat: 새 기능" --body "설명"

# PR 목록 확인
gh pr list

# PR 상세 정보
gh pr view 123

# PR 체크아웃
gh pr checkout 123

# PR 병합
gh pr merge 123

# PR 코멘트 확인
gh api repos/interview-lab/lab/pulls/123/comments
```

---

### Issue 관리

```bash
# Issue 생성 (대화형)
gh issue create

# Issue 생성 (템플릿 사용)
gh issue create --template bug_report.yml
gh issue create --template feature_request.yml

# Issue 목록
gh issue list

# Issue 상세
gh issue view 42

# Issue 종료
gh issue close 42
```

---

## GitHub Actions 워크플로우

### Claude Code 통합

**트리거**: 
- Issue 코멘트에 `@claude` 멘션
- PR 리뷰 코멘트에 `@claude` 멘션

**사용 예제**:
```
# Issue 코멘트
@claude 이 기능을 구현해줘

# PR 리뷰 코멘트
@claude 이 코드를 리팩토링해줘
```

---

### Claude Code Review

**트리거**: PR opened, synchronize

**동작**:
- PR 변경 사항 자동 분석
- 코드 품질, 버그, 성능, 보안, 테스트 커버리지 검토
- CLAUDE.md 기반 스타일/컨벤션 확인
- 한글로 리뷰 코멘트 작성

**파일**: `.github/workflows/claude-code-review.yml`

---

## Issue 템플릿

### Bug Report

**파일**: `.github/ISSUE_TEMPLATE/bug_report.yml`

**필드**:
- 어떤 버그인가요? (텍스트)
- 어떤 상황에서 발생한 버그인가요? (Given-When-Then)
  - Given (전제 조건)
  - When (실행 조건)
  - Then (결과)
- 예상 결과 (텍스트)
- 참고할만한 자료 (URL, 선택)

**사용**:
```bash
gh issue create --template bug_report.yml
```

---

### Feature Request

**파일**: `.github/ISSUE_TEMPLATE/feature_request.yml`

**필드**:
- 어떤 기능인가요? (텍스트)
- 작업 상세 내용 (체크리스트)
- 참고할만한 자료 (URL, 선택)

**사용**:
```bash
gh issue create --template feature_request.yml
```

---

## 개발 워크플로우 전체 흐름

### 1. 새 기능 개발

```bash
# 1. 브랜치 생성
git checkout -b feat/user-profile develop

# 2. 코드 작성
# ... UI 컴포넌트 작성 (packages/ui/) ...
pnpm --filter=@interview-lab/ui storybook  # Storybook에서 확인

# 3. Frontend에서 사용
# ... Frontend 페이지 작성 (apps/frontend/) ...
pnpm dev --filter=@interview-lab/frontend  # 개발 서버 확인

# 4. Backend API 작성
# ... Backend 컨트롤러/서비스 작성 (apps/backend/) ...
pnpm test --filter=@interview-lab/backend  # 테스트 실행

# 5. 포맷팅 및 타입 체크
pnpm format
pnpm check-types

# 6. 커밋 및 푸시
/commit
git push -u origin feat/user-profile

# 7. PR 생성
gh pr create --base develop --head feat/user-profile

# 또는 스킬로 한 번에
/commit-push-pr "feat/user-profile에서 develop으로 PR 생성"
```

---

### 2. 버그 수정

```bash
# 1. Issue 확인
gh issue view 42

# 2. 브랜치 생성
git checkout -b fix/login-bug develop

# 3. 버그 수정
# ... 코드 수정 ...

# 4. 테스트
pnpm test  # 단위 테스트
pnpm test:e2e  # E2E 테스트 (필요시)

# 5. 포맷팅
pnpm format

# 6. 커밋 (Issue 연동)
git commit -m "fix: 로그인 버그 수정 (fixes #42)"

# 7. 푸시 및 PR
git push -u origin fix/login-bug
gh pr create --base develop
```

---

### 3. 컴포넌트 추가 (UI 패키지)

```bash
# 1. UI 패키지로 이동
cd packages/ui

# 2. 컴포넌트 파일 생성
mkdir -p src/components/atoms/Button
touch src/components/atoms/Button/index.tsx
touch src/components/atoms/Button/button.css.ts
touch src/components/atoms/Button/button.stories.ts

# 3. 컴포넌트 구현
# ... Props 정의, 스타일 작성, 컴포넌트 구현 ...

# 4. Storybook 스토리 작성
# ... argTypes, stories 작성 ...

# 5. Storybook에서 확인
pnpm storybook

# 6. Export 추가
# ... src/components/atoms/index.ts에 Button 추가 ...

# 7. 포맷팅 및 빌드
pnpm format
pnpm build

# 8. Frontend에서 테스트
cd ../../apps/frontend
pnpm dev
# ... Button 사용 ...

# 9. 커밋
cd ../..
/commit
```

---

## 주요 명령어 치트시트

### 자주 사용하는 명령어

```bash
# 개발 시작
pnpm dev                      # 모든 워크스페이스
pnpm dev --filter=@interview-lab/frontend  # Frontend만

# 빌드
pnpm build                    # 전체
pnpm build --filter=@interview-lab/ui      # UI만

# 코드 품질
pnpm format                   # 포맷팅 (커밋 전 필수!)
pnpm lint                     # 린트 검사
pnpm check-types              # 타입 체크

# 테스트
pnpm test --filter=@interview-lab/backend  # Backend 테스트
pnpm test:e2e --filter=@interview-lab/backend  # E2E 테스트

# Storybook
pnpm --filter=@interview-lab/ui storybook  # 개발 서버
pnpm --filter=@interview-lab/ui build-storybook  # 빌드

# Git
pnpm format && git add . && git commit -m "..."  # 포맷 + 커밋
/commit                       # Claude Code 스킬
/commit-push-pr               # 커밋 + 푸시 + PR

# GitHub CLI
gh pr create                  # PR 생성
gh pr list                    # PR 목록
gh issue create               # Issue 생성
```

---

## 체크리스트

### 커밋 전 체크리스트
- [ ] `pnpm format` 실행
- [ ] `pnpm lint` 오류 없음
- [ ] `pnpm check-types` 오류 없음
- [ ] 테스트 통과 (`pnpm test`)
- [ ] Conventional Commits 규칙 준수

### PR 생성 전 체크리스트
- [ ] 모든 커밋 메시지가 Conventional Commits 규칙 준수
- [ ] 변경 사항에 대한 테스트 작성
- [ ] 빌드 성공 (`pnpm build`)
- [ ] PR 템플릿 작성 완료
- [ ] 스크린샷 첨부 (UI 변경 시)

### 새 컴포넌트 추가 체크리스트
- [ ] Props 타입 정의 (HTML 속성 상속)
- [ ] 스타일 작성 (theme.css.ts 토큰 사용)
- [ ] Storybook 스토리 작성
- [ ] Export 추가 (index.ts)
- [ ] `pnpm format` 실행
- [ ] `pnpm build --filter=@interview-lab/ui` 성공
- [ ] Storybook에서 확인

---

이 메모리를 통해 Serena는 프로젝트의 모든 명령어, Git 워크플로우, 개발 흐름을 이해하고, 적절한 명령어를 선택하여 작업을 수행할 수 있습니다.