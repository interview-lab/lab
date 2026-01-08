import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const buttonStyle = style({
	position: 'relative',
	borderRadius: '50%',
	height: 56,
	width: 56,
	border: 'none',
	padding: 0,
	cursor: 'pointer',
	outline: 'none',
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
