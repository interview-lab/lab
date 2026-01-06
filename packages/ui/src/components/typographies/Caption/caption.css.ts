import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const baseCaptionStyle = style({
	color: 'inherit',
	fontFamily: vars.font.pretendard,
	whiteSpace: 'pre-line',
});

export const CaptionStyleVarient = styleVariants({
	primary: [
		baseCaptionStyle,
		{ fontSize: vars.fontSize.sizeXs, fontWeight: vars.fontWeight.light },
	],
});
