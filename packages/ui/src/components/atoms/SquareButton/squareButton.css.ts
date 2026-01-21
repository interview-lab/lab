import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const buttonStyle = style({
	position: 'relative',
	borderRadius: 12,
	height: 48,
	width: 48,
	border: 'none',
	padding: 0,
	cursor: 'pointer',
	outline: 'none',
	transition: 'all 300ms',
});

export const activeButtonStyle = style({
	backgroundColor: vars.color.blue,
	boxShadow: `0 10px 15px -3px ${vars.color.blueAlpha30}, 0 4px 6px -4px ${vars.color.blueAlpha30}`,
});

export const iconStyle = style({
	position: 'absolute',
	color: vars.color.grayLight,
	width: 24,
	height: 24,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
});

export const activeIconStyle = style({
	color: vars.color.white,
});
