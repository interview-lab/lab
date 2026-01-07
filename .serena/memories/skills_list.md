# Claude Code 스킬 목록

이 문서는 프로젝트에서 사용 가능한 Claude Code 스킬들을 정리합니다.

**스킬이란?**: Claude Code가 제공하는 특화된 작업 자동화 기능

**호출 방법**:
- 슬래시 명령: `/commit`, `/code-review` 등
- 자연어: "커밋을 생성해줘", "PR을 리뷰해줘"

---

## Git 워크플로우 스킬

### 1. commit - Git 커밋 생성

**목적**: 변경 사항을 분석하여 Conventional Commits 규격의 커밋 생성

**호출 방법**:
```
/commit
```

또는:
```
"커밋을 생성해줘"
"변경 사항을 커밋해줘"
```

**동작 과정**:
1. `git status` 실행 → 변경된 파일 확인
2. `git diff` 실행 → 변경 내용 분석
3. `git log` 실행 → 기존 커밋 메시지 스타일 확인
4. 커밋 메시지 생성 (Conventional Commits)
5. `pnpm format` 실행 (포맷팅)
6. 변경 파일 스테이징
7. `git commit` 실행
8. `git status` 확인

**생성되는 커밋 메시지 형식**:
```
<타입>(적용 범위): <설명>

[본문]
```

**예시 출력**:
```
feat(ui): Badge 컴포넌트 추가

라벨 및 상태 표시용 배지 컴포넌트를 추가했습니다.
```

**언제 사용하는가?**
- ✅ 코드 작성 완료 후 커밋이 필요할 때
- ✅ 커밋 메시지 작성에 고민될 때
- ✅ Conventional Commits 규격을 자동으로 준수하고 싶을 때
- ❌ 여러 개의 논리적으로 분리된 변경사항 (수동으로 나눠 커밋)

**주의사항**:
- 커밋 전 항상 `pnpm format` 실행
- 시크릿 파일 (.env, credentials.json) 커밋하지 않음
- 변경사항이 없으면 빈 커밋 생성하지 않음

---

### 2. commit-push-pr - 커밋 + 푸시 + PR 생성

**목적**: 커밋 생성 → 원격 푸시 → Pull Request 생성을 한 번에 수행

**호출 방법**:
```
/commit-push-pr
```

또는 인자와 함께:
```
/commit-push-pr "ui브랜치에서 develop 브랜치로의 PR을 생성해줘"
```

**동작 과정**:
1. `git status`, `git diff` 실행
2. 현재 브랜치 확인 (main이면 새 브랜치 생성)
3. 커밋 메시지 생성 (Conventional Commits)
4. 변경 파일 스테이징
5. `git commit` 실행
6. `git push -u origin <branch>` 실행
7. `gh pr create` 실행 (PR 템플릿 사용)
8. PR URL 반환

**생성되는 PR**:
- **제목**: 커밋 히스토리 기반 요약
- **본문**: PR 템플릿 (`.github/PULL_REQUEST_TEMPLATE.md`)
  - 개요
  - 유형 (체크리스트)
  - 변경점
  - 스크린샷
  - PR Checklist

**예시 출력**:
```
PR이 성공적으로 생성되었습니다!
PR URL: https://github.com/interview-lab/lab/pull/3

요약:
- 커밋: feat(ui): UI 컴포넌트 라이브러리 기본 구성
- 브랜치: ui → develop
- 총 17개의 커밋 포함
```

**언제 사용하는가?**
- ✅ 기능 개발 완료 후 PR 생성
- ✅ 빠르게 커밋 + 푸시 + PR을 한 번에
- ✅ PR 템플릿을 자동으로 채우고 싶을 때

**주의사항**:
- 현재 브랜치의 모든 커밋이 PR에 포함됨
- main/master로 직접 푸시하지 않음
- force push 절대 사용 안 함

---

### 3. code-review - PR 코드 리뷰

**목적**: Pull Request 자동 코드 리뷰

**호출 방법**:
```
/code-review
```

또는:
```
"이 PR을 리뷰해줘"
```

**동작**:
- PR 변경 사항 분석
- 코드 품질, 버그, 성능, 보안 검토
- CLAUDE.md 기반 스타일/컨벤션 확인
- 테스트 커버리지 확인
- 한글로 리뷰 코멘트 작성

**검토 항목**:
1. **코드 품질**
   - 가독성
   - 유지보수성
   - 중복 코드
   - 명명 규칙

2. **버그**
   - 논리 오류
   - 예외 처리 누락
   - 경계 조건 처리

3. **성능**
   - 불필요한 연산
   - 메모리 누수
   - 최적화 가능성

4. **보안**
   - 입력 검증
   - 인증/인가
   - 민감 정보 노출

5. **테스트**
   - 테스트 커버리지
   - 엣지 케이스 테스트

6. **스타일/컨벤션**
   - Conventional Commits
   - CLAUDE.md 규칙 준수
   - Biome 포맷팅

**출력 형식**:
```markdown
## 코드 리뷰

### 긍정적인 점
- ...

### 개선 제안
- ...

### 보안/버그
- ...
```

**언제 사용하는가?**
- ✅ PR 생성 후 코드 리뷰가 필요할 때
- ✅ 자동 코드 리뷰로 빠른 피드백
- ✅ 리뷰어가 없을 때

**자동 실행**:
- GitHub Actions: PR opened/synchronize 시 자동 실행 (`.github/workflows/claude-code-review.yml`)

---

## 개발 스킬

### 4. frontend-design - 프론트엔드 UI 디자인

**목적**: 프론트엔드 UI 컴포넌트 디자인 및 구현

**호출 방법**:
```
/frontend-design
```

또는:
```
"로그인 페이지를 디자인해줘"
"대시보드 레이아웃을 만들어줘"
```

**동작**:
- 웹 컴포넌트, 페이지, 아티팩트 생성
- 높은 디자인 품질
- 프로덕션 수준 코드 생성
- 일반적인 AI 미학 회피

**사용 기술**:
- React
- Vanilla Extract (CSS-in-TypeScript)
- Next.js App Router
- UI 컴포넌트 라이브러리 (`@interview-lab/ui`)

**언제 사용하는가?**
- ✅ 새 페이지 디자인
- ✅ UI 컴포넌트 생성
- ✅ 레이아웃 구성
- ❌ 백엔드 로직

**출력**:
- 완성된 React 컴포넌트
- Vanilla Extract 스타일
- 반응형 디자인
- 접근성 고려

---

### 5. webapp-testing - 웹앱 테스트

**목적**: Playwright를 사용한 웹앱 UI 테스트 자동화

**호출 방법**:
```
/webapp-testing
```

또는:
```
"로그인 페이지를 테스트해줘"
"폼 제출 기능을 테스트해줘"
```

**동작**:
- 브라우저 자동화 (Playwright)
- 프론트엔드 동작 검증
- 스크린샷 캡처
- 디버깅

**테스트 시나리오**:
1. 페이지 이동
2. 요소 상호작용 (클릭, 입력)
3. 결과 확인
4. 스크린샷 캡처
5. 에러 로그 수집

**언제 사용하는가?**
- ✅ UI 기능 테스트
- ✅ 사용자 플로우 검증
- ✅ 버그 재현
- ❌ 단위 테스트 (Jest 사용)

---

### 6. figma:implement-design - Figma 디자인 구현

**목적**: Figma 디자인을 프로덕션 코드로 변환

**호출 방법**:
```
/figma:implement-design
```

또는:
```
"이 Figma 디자인을 구현해줘"
"Figma URL: https://figma.com/file/..."
```

**동작**:
- Figma 디자인 분석
- 1:1 시각적 충실도로 코드 생성
- React + Vanilla Extract 사용

**요구사항**:
- Figma MCP 서버 연결 필요
- Figma URL 제공

**언제 사용하는가?**
- ✅ Figma 디자인 → 코드 변환
- ✅ 디자인 시스템 구현
- ❌ Figma 파일 없이 디자인 (frontend-design 사용)

---

### 7. figma:code-connect-components - Code Connect

**목적**: Figma 디자인 컴포넌트와 코드 컴포넌트 연결

**호출 방법**:
```
/figma:code-connect-components
```

또는:
```
"Figma 컴포넌트를 코드와 연결해줘"
```

**동작**:
- Figma 컴포넌트 → 코드 컴포넌트 매핑
- Code Connect 설정 생성

**요구사항**:
- Figma MCP 서버 연결 필요

**언제 사용하는가?**
- ✅ 디자인-코드 동기화
- ✅ 디자인 시스템 관리
- ❌ 일반 컴포넌트 작성

---

## 문서 및 아티팩트 스킬

### 8. doc-coauthoring - 문서 공동 작성

**목적**: 구조화된 문서 작성 워크플로우

**호출 방법**:
```
/doc-coauthoring
```

또는:
```
"기술 문서를 작성해줘"
"API 명세서를 만들어줘"
```

**워크플로우**:
1. 컨텍스트 수집
2. 초안 작성
3. 반복 개선
4. 검증

**문서 유형**:
- 기술 문서
- 제안서
- 기술 스펙
- 결정 문서

**언제 사용하는가?**
- ✅ 문서 작성 가이드 필요
- ✅ 구조화된 문서
- ❌ 간단한 README (직접 작성)

---

### 9. pptx, docx, xlsx, pdf - 오피스 문서

**목적**: 프로그래밍 방식으로 오피스 문서 생성/수정

**호출 방법**:
```
/pptx "프레젠테이션을 만들어줘"
/docx "보고서를 작성해줘"
/xlsx "데이터를 스프레드시트로 만들어줘"
/pdf "PDF 보고서를 생성해줘"
```

**기능**:
- **pptx**: 프레젠테이션 생성/수정
- **docx**: Word 문서 생성/수정 (tracked changes, comments)
- **xlsx**: 스프레드시트 생성/수정 (formulas, formatting, visualization)
- **pdf**: PDF 생성/수정 (텍스트 추출, 폼 작성)

**언제 사용하는가?**
- ✅ 오피스 문서 자동 생성
- ✅ 데이터 시각화
- ✅ 보고서 작성
- ❌ 코드 작성

---

### 10. algorithmic-art, canvas-design - 아트/디자인

**목적**: 알고리즘 아트 및 시각 디자인 생성

**호출 방법**:
```
/algorithmic-art "제너러티브 아트를 만들어줘"
/canvas-design "포스터를 디자인해줘"
```

**기능**:
- **algorithmic-art**: p5.js로 알고리즘 아트 생성
- **canvas-design**: Canvas API로 시각 디자인 (.png, .pdf)

**언제 사용하는가?**
- ✅ 제너러티브 아트
- ✅ 포스터, 디자인
- ❌ UI 컴포넌트 (frontend-design 사용)

---

### 11. web-artifacts-builder - 복잡한 HTML 아티팩트

**목적**: 다중 컴포넌트 claude.ai HTML 아티팩트 생성

**호출 방법**:
```
/web-artifacts-builder
```

또는:
```
"복잡한 인터랙티브 웹 아티팩트를 만들어줘"
```

**사용 기술**:
- React
- Tailwind CSS
- shadcn/ui 컴포넌트
- 상태 관리
- 라우팅

**언제 사용하는가?**
- ✅ 복잡한 아티팩트 (상태 관리, 라우팅 필요)
- ✅ shadcn/ui 컴포넌트 필요
- ❌ 간단한 HTML (직접 작성)

---

## 기타 스킬

### 12. skill-creator - 새 스킬 생성

**목적**: 커스텀 스킬 생성 가이드

**호출 방법**:
```
/skill-creator
```

또는:
```
"새 스킬을 만들고 싶어"
```

**워크플로우**:
1. 스킬 목적 정의
2. 워크플로우 설계
3. 도구 통합
4. 스킬 문서 작성

**언제 사용하는가?**
- ✅ 반복 작업 자동화
- ✅ 전문화된 워크플로우 필요
- ❌ 일회성 작업

---

### 13. mcp-builder - MCP 서버 빌드

**목적**: MCP 서버 생성 가이드

**호출 방법**:
```
/mcp-builder
```

또는:
```
"MCP 서버를 만들고 싶어"
```

**언어 지원**:
- Python (FastMCP)
- Node.js / TypeScript (MCP SDK)

**언제 사용하는가?**
- ✅ 외부 API 통합
- ✅ 커스텀 도구 필요
- ❌ 기존 MCP 서버 사용 가능

---

### 14. notion-* - Notion 통합

**Notion 스킬 목록**:
- `notion-research-documentation`: Notion 검색 및 문서화
- `notion-knowledge-capture`: 대화 → Notion 페이지
- `notion-spec-to-implementation`: 스펙 → 구현 태스크

**호출 방법**:
```
/notion-research-documentation
/notion-knowledge-capture
/notion-spec-to-implementation
```

**요구사항**:
- Notion 통합 설정 필요

**언제 사용하는가?**
- ✅ Notion 워크스페이스 사용
- ✅ 지식 관리
- ❌ Notion 미사용

---

## 프로젝트에서 자주 사용하는 스킬

### 우선순위 1 (매일 사용)

1. **/commit** - 커밋 생성
   - 모든 코드 작업 후
   - Conventional Commits 자동 준수

2. **/commit-push-pr** - 커밋 + PR 생성
   - 기능 개발 완료 후
   - 빠른 PR 생성

### 우선순위 2 (주 1-2회)

3. **/code-review** - 코드 리뷰
   - PR 생성 후
   - 코드 품질 검증

4. **/frontend-design** - UI 디자인
   - 새 페이지/컴포넌트 작성
   - 디자인 구현

### 우선순위 3 (필요 시)

5. **/webapp-testing** - 웹앱 테스트
   - UI 기능 검증
   - 버그 재현

6. **/doc-coauthoring** - 문서 작성
   - 기술 문서
   - API 명세서

---

## 스킬 선택 가이드

### "어떤 스킬을 사용해야 하는가?"

**코드 작업 완료 후**:
- 커밋만: `/commit`
- 커밋 + PR: `/commit-push-pr`

**PR 생성 후**:
- 코드 리뷰: `/code-review`

**UI 개발**:
- 새 페이지/컴포넌트: `/frontend-design`
- Figma 디자인 있음: `/figma:implement-design`
- 복잡한 아티팩트: `/web-artifacts-builder`

**테스트**:
- UI 테스트: `/webapp-testing`
- 단위 테스트: 직접 작성 (Jest)

**문서 작성**:
- 기술 문서: `/doc-coauthoring`
- 프레젠테이션: `/pptx`
- 보고서: `/docx`

**기타**:
- 데이터 분석: `/xlsx`
- 디자인: `/canvas-design`
- 알고리즘 아트: `/algorithmic-art`

---

## 스킬 사용 예시

### 시나리오 1: 새 기능 개발 → PR

```
1. 코드 작성
   ... Badge 컴포넌트 구현 ...

2. 커밋 + PR 생성
   /commit-push-pr "ui 브랜치에서 develop으로 PR 생성"

3. 자동 코드 리뷰 대기
   (GitHub Actions가 자동으로 /code-review 실행)

4. PR 병합
```

---

### 시나리오 2: 로그인 페이지 디자인 및 테스트

```
1. UI 디자인
   /frontend-design "로그인 페이지를 만들어줘. 이메일, 비밀번호 입력과 로그인 버튼이 필요해"

2. 코드 확인 및 수정
   ... 생성된 코드 확인 ...

3. 커밋
   /commit

4. 테스트
   /webapp-testing "로그인 페이지를 테스트해줘. 폼 제출이 제대로 동작하는지 확인해줘"

5. 스크린샷 확인
   ... 캡처된 스크린샷 확인 ...

6. PR 생성
   git push
   gh pr create
```

---

### 시나리오 3: API 문서 작성

```
1. 문서 작성
   /doc-coauthoring "User API 명세서를 작성해줘. GET /users, POST /users, PUT /users/:id, DELETE /users/:id 엔드포인트를 포함해"

2. 워크플로우 진행
   ... 컨텍스트 수집 → 초안 → 개선 → 검증 ...

3. 문서 완성
   ... 생성된 마크다운 문서 확인 ...

4. 커밋
   /commit
```

---

## 스킬 조합 전략

### 효율적인 워크플로우

**개발 → 커밋 → PR → 리뷰**:
```
코드 작성 → /commit-push-pr → (자동 /code-review) → 병합
```

**UI 개발 → 테스트 → 문서화**:
```
/frontend-design → /webapp-testing → /doc-coauthoring → /commit
```

**Figma → 구현 → 연결**:
```
/figma:implement-design → /figma:code-connect-components → /commit
```

---

## 주의사항

### 스킬 사용 시 주의할 점

1. **적절한 스킬 선택**
   - 작업에 맞는 스킬 사용
   - 과도하게 복잡한 스킬 회피

2. **스킬 결과 검증**
   - 생성된 코드/문서 확인
   - 테스트 실행
   - 포맷팅 확인

3. **스킬 조합**
   - 여러 스킬 순차적 사용 가능
   - 하나의 스킬이 실패해도 다음 시도

4. **스킬 제약 이해**
   - 각 스킬의 제약사항 확인
   - 요구사항 충족 (MCP 서버 등)

---

## 빠른 참조

### 슬래시 명령어 치트시트

```bash
# Git 워크플로우
/commit                    # 커밋 생성
/commit-push-pr            # 커밋 + 푸시 + PR
/code-review               # PR 리뷰

# 개발
/frontend-design           # UI 디자인
/webapp-testing            # 웹앱 테스트
/figma:implement-design    # Figma → 코드
/figma:code-connect-components  # Figma 연결

# 문서
/doc-coauthoring           # 문서 작성
/pptx                      # 프레젠테이션
/docx                      # Word 문서
/xlsx                      # 스프레드시트
/pdf                       # PDF

# 아트/디자인
/algorithmic-art           # 알고리즘 아트
/canvas-design             # 시각 디자인
/web-artifacts-builder     # 복잡한 아티팩트

# 기타
/skill-creator             # 스킬 생성
/mcp-builder               # MCP 서버 빌드
/notion-*                  # Notion 통합
```

---

이 메모리를 통해 Serena는 프로젝트에서 사용 가능한 모든 Claude Code 스킬을 이해하고, 상황에 맞는 적절한 스킬을 선택하여 작업을 효율적으로 수행할 수 있습니다.