import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	//justifyContent: 'space-between',
	gap: vars.spacing[2],
	fontFamily: vars.font.pretendard,
	padding: vars.spacing[6],
	borderRadius: vars.radius.lg,
	cursor: 'pointer',
	position: 'relative',
	boxSizing: 'border-box',
	minHeight: 196,
	width: 328,
	border: 'none',
	background: 'none',
	textAlign: 'left',
});

export const selectedStyle = style({
	border: `${vars.border.width1} ${vars.color.blue}`,
});

export const titleStyle = style({
	fontSize: vars.fontSize.sizeXl,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.black,
	margin: 0,
	marginTop: vars.spacing[4],
});

export const descriptionStyle = style({
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.regular,
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
	color: vars.color.blue,
});
