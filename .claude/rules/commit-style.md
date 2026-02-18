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
