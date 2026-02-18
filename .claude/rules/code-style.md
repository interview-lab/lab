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

---

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
import clsx from 'clsx';

<div className={clsx(componentStyle, className)} />
```
