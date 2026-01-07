import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const baseSubtitleStyle = style({
	color: 'inherit',
	fontFamily: vars.font.pretendard,
	whiteSpace: 'pre-line',
});

export const SubtitleStyleVarient = styleVariants({
	primary: [
		baseSubtitleStyle,
		{
			fontSize: vars.fontSize.sizeBase,
			fontWeight: vars.fontWeight.semibold,
		},
	],
});
