import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const labelStyle = style({
	marginBottom: 8,
	fontFamily: vars.font.pretendard,
	fontSize: 14,
	fontWeight: vars.fontWeight.medium,
	color: vars.color.blueDark,
});

export const inputContainerStyle = style({
	position: 'relative',
});

export const inputStyle = style({
	height: 52,
	minWidth: 200,
	border: `2px solid ${vars.color.border.default}`,
	borderRadius: vars.radius.default,
	paddingInline: 44,
	display: 'flex',
	alignItems: 'center',
	fontFamily: vars.font.pretendard,
	fontSize: 14,
	fontWeight: vars.fontWeight.regular,
	boxSizing: 'border-box',
	color: vars.color.gray,

	':disabled': {
		color: vars.color.disabled.text,
		borderColor: vars.color.disabled.border,
		backgroundColor: vars.color.disabled.background,
		cursor: 'not-allowed',
	},
});

const baseIconStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	color: vars.color.gray,
});

export const leftIconStyle = style([
	baseIconStyle,
	{
		left: 16,
	},
]);

export const rightIconStyle = style([
	baseIconStyle,
	{
		right: 16,
	},
]);
