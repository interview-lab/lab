import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[2],
	fontFamily: vars.font.pretendard,
	padding: vars.spacing[6],
	borderRadius: vars.radius.lg,
	cursor: 'pointer',
	position: 'relative',
	boxSizing: 'border-box',
	minHeight: 196,
	width: 328,
	background: vars.color.white,
	textAlign: 'left',
	border: `${vars.border.width1} ${vars.color.grayLight}`,
	boxShadow: vars.shadow.sm,
});

export const selectedStyle = style({
	border: `${vars.border.width1} ${vars.color.blue}`,
	background: vars.color.blueAlpha10,
	boxShadow: vars.shadow.md,
});

export const titleStyle = style({
	fontSize: vars.fontSize.sizeXl,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.black,
	margin: 0,
	marginTop: vars.spacing[2],
});

export const descriptionStyle = style({
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.medium,
	color: vars.color.gray,
	margin: 0,
	paddingRight: vars.spacing[5],
	wordBreak: 'keep-all',
	overflowWrap: 'break-word',
});

export const checkIconStyle = style({
	position: 'absolute',
	top: vars.spacing[6],
	right: vars.spacing[6],
	width: 24,
	height: 24,
	color: vars.color.blue,
});
