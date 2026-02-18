## 프로젝트 소개

**CS 인터뷰 연습 플랫폼** — 개발자가 실제 기술 면접을 대비해 CS 지식을 체계적으로 연습할 수 있는 AI 기반 서비스입니다.

### 핵심 기능

- **인터뷰 모드 선택**: 네트워크, 운영체제, 프론트엔드, 백엔드, 자료구조, 랜덤모드 중 선택
- **AI 질문 생성**: LLM이 선택한 분야의 CS 면접 질문과 힌트(tip)를 자동 생성
- **음성 답변**: 마이크로 답변을 녹음하면 음성→텍스트 변환 후 제출
- **AI 답변 평가**: 제출된 답변에 대해 LLM이 점수와 피드백을 즉시 제공
- **결과 리포트**: 세션 종료 후 전체 질문·답변·점수·AI 피드백 종합 확인
- **마이페이지**: 이전 인터뷰 세션 이력 조회
- **OAuth 인증**: Google, GitHub 소셜 로그인 지원

### 기술 스택 요약

- **Frontend**: Next.js (App Router), React 19, Vanilla Extract
- **Backend**: NestJS, Prisma, Mastra AI 프레임워크
- **AI**: mastra AI 에이전트 프레임워크 기반 LLM으로 질문 생성 및 답변 평가

---

## 일반 가이드라인

### 프로젝트 활성화

작업 시작 시 Serena 프로젝트 활성화:

```typescript
mcp__plugin_serena_serena__activate_project({
  project: '/Users/kimbohyeon/interview'
})
```

### Serena 플러그인 우선 사용

파일 탐색, 코드 탐색, 프로젝트 구조 파악 시 **Serena MCP 플러그인을 우선적으로 사용**하세요.
상세 사용법은 `.claude/rules/tools/serena.md` 참고.

### 코드 수정 원칙

- 코드 수정 전 항상 심볼 개요 확인
- 리팩토링 시 `find_referencing_symbols`로 영향 범위 파악
- 대규모 파일은 심볼 단위로 점진적으로 분석
- 불필요한 전체 파일 읽기 지양
