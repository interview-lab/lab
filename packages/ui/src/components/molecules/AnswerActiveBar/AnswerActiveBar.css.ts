import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	width: '100%',
	borderRadius: vars.radius.md,
	background: vars.color.white,
	padding: vars.spacing[4],
	gap: vars.spacing[4],
	border: `${vars.border.width1} ${vars.color.grayLight}`,
	boxShadow: vars.shadow.xl,
});

export const sendButtonStyle = style({
	flex: 1,
	background: vars.color.blue,
	fontFamily: vars.font.pretendard,
	color: vars.color.white,
	fontWeight: vars.fontWeight.semibold,
	fontSize: vars.fontSize.sizeLg,
	paddingInline: 14,
	cursor: 'pointer',
	':hover': {
		background: vars.color.blueHover,
	},
	boxShadow: `0 10px 15px -3px ${vars.color.blueAlpha30}, 0 4px 6px -4px ${vars.color.blueAlpha30}`,
});

export const muteButtonStyle = style({
	':hover': {
		background: vars.color.grayLight,
	},
});
