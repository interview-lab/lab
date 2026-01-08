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
	boxShadow: `0 10px 15px -3px ${vars.color.blue}, 0 4px 6px -4px ${vars.color.blue}`,
});

export const iconStyle = style({
	position: 'absolute',
	color: vars.color.gray,
	width: 24,
	height: 28,
	top: '50%',
	left: '50%',
	transform: 'translate(-45%, -50%)',
});

export const activeIconStyle = style({
	color: '#FFFFFF',
});
