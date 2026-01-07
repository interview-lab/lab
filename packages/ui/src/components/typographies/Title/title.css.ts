import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const baseTitleStyle = style({
	color: 'inherit',
	fontFamily: vars.font.pretendard,
	whiteSpace: 'pre-line',
});

export const TitleStyleVarient = styleVariants({
	primary: [
		baseTitleStyle,
		{ fontSize: vars.fontSize.size4xl, fontWeight: vars.fontWeight.extrabold },
	],
	secondary: [
		baseTitleStyle,
		{ fontSize: vars.fontSize.size4xl, fontWeight: vars.fontWeight.bold },
	],
	tertiary: [
		baseTitleStyle,
		{ fontSize: vars.fontSize.sizeXl, fontWeight: vars.fontWeight.regular },
	],
});
