import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const inputStyle = style({
	position: 'relative',
});

export const errorStyle = style({
	border: `1px solid ${vars.color.border.error}`,

	selectors: {
		'&:has(input)': {
			border: 'none',
		},
	},
});

export const errorMessageStyle = style({
	fontSize: 14,
	fontWeight: vars.fontWeight.regular,
	fontFamily: vars.font.pretendard,
	color: vars.color.border.error,
	marginTop: 8,

	selectors: {
		[`${inputStyle}:has(input:disabled) + &`]: {
			display: 'none',
		},
	},
});

globalStyle(`${inputStyle}:has(input:disabled) svg`, {
	color: vars.color.disabled.text,
});

globalStyle(`${errorStyle} :is(label, svg)`, {
	color: vars.color.border.error,
});
