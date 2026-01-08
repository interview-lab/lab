import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 12,
	padding: vars.spacing[3],
	minWidth: 137,
	fontFamily: vars.font.pretendard,
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.black,
	borderRadius: vars.radius.default,
	border: 'none',
	outline: 'none',
	transition: 'all 300ms',
});
