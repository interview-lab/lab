import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	position: 'relative',
});

export const inputStyle = style({
	height: 52,
	minWidth: 200,
	border: `${vars.border.width2} ${vars.color.border.default}`,
	borderRadius: vars.radius.default,
	paddingInline: 44,
	display: 'flex',
	alignItems: 'center',
	fontFamily: vars.font.pretendard,
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.regular,
	color: vars.color.gray,
	boxSizing: 'border-box',

	':disabled': {
		color: vars.color.disabled.text,
		borderColor: vars.color.disabled.border,
		backgroundColor: vars.color.disabled.background,
		cursor: 'not-allowed',
	},
});

export const iconStyle = style({
	position: 'absolute',
	left: 16,
	top: '50%',
	transform: 'translateY(-50%)',
});
