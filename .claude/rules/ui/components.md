---
paths: packages/ui/**/*.ts,packages/ui/**/*.tsx
---

## UI 컴포넌트 작성 규칙

### Props 타입

HTML 기본 속성 상속 사용:
- `InputHTMLAttributes<HTMLInputElement>`
- `ButtonHTMLAttributes<HTMLButtonElement>`
- 기타 HTML 요소의 기본 속성 상속

### 조건부 스타일

별도 스타일 상수로 분리하여 `clsx`로 조합:

```typescript
import clsx from 'clsx';

const variantStyles = {
  primary: primaryStyle,
  secondary: secondaryStyle,
};

<button className={clsx(baseStyle, variantStyles[variant], className)} />
```

### Storybook 스토리

모든 컴포넌트에 `.stories.ts` 파일 작성:

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};
```

### Atomic Design 폴더 구조

```
packages/ui/src/components/
├── atoms/          # 기본 컴포넌트 (Button, Input, Icon, Badge)
├── molecules/      # 조합 컴포넌트 (InputWithValidation)
├── organisms/      # 복합 컴포넌트
└── typographies/   # 타이포그래피 (Title, Subtitle, Base, Caption)
```

- `atoms`: 더 이상 분리할 수 없는 기본 단위
- `molecules`: atoms 조합으로 구성
- `organisms`: molecules 조합으로 구성
- 컴포넌트 복잡도에 맞는 적절한 레벨 선택
