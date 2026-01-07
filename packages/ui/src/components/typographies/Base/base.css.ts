import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const baseTextStyle = style({
	color: 'inherit',
	fontFamily: vars.font.pretendard,
	whiteSpace: 'pre-line',
});

export const BaseStyleVarient = styleVariants({
	primary: [
		baseTextStyle,
		{ fontSize: vars.fontSize.sizeSm, fontWeight: vars.fontWeight.medium },
	],
	secondary: [
		baseTextStyle,
		{ fontSize: vars.fontSize.sizeSm, fontWeight: vars.fontWeight.regular },
	],
});
