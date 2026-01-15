import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const labelStyle = style({
	marginBottom: vars.spacing['2'],
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
	borderRadius: vars.radius.default,
	border: 'none',
	paddingInline: 44,
	display: 'flex',
	alignItems: 'center',
	fontFamily: vars.font.pretendard,
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.regular,
	color: vars.color.gray,
	boxSizing: 'border-box',
	boxShadow: vars.shadow.input.default,

	':disabled': {
		color: vars.color.disabled.text,
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
