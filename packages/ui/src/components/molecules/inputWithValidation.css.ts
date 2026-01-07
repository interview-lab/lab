import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const inputStyle = style({
	position: 'relative',
});

export const errorStyle = style({
	borderColor: vars.color.border.error,
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

export const iconStyle = style({
	color: vars.color.border.error,
	position: 'absolute',
	right: 16,
	top: '50%',
	transform: 'translateY(-50%)',
});

globalStyle(`${inputStyle}:has(input:disabled) svg`, {
	color: vars.color.disabled.text,
});
