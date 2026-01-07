import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const baseButtonStyle = style({
	color: 'inherit',
	fontFamily: vars.font.pretendard,
	whiteSpace: 'pre-line',
});

export const ButtonStyleVariant = styleVariants({
	primary: [
		baseButtonStyle,
		{
			fontSize: vars.fontSize.sizeBase,
			fontWeight: vars.fontWeight.bold,
		},
	],
	secondary: [
		baseButtonStyle,
		{
			fontSize: vars.fontSize.sizeSm,
			fontWeight: vars.fontWeight.bold,
		},
	],
});
