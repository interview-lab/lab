import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[2],
	fontFamily: vars.font.pretendard,
	padding: vars.spacing[6],
	borderRadius: vars.radius.md,
	backgroundColor: vars.color.white,
	minWidth: 345,
	minHeight: 151,
	boxSizing: 'border-box',
});

export const headerStyle = style({
	display: 'flex',
	alignItems: 'center',
	height: 28,
	justifyContent: 'space-between',
});

export const titleStyle = style({
	fontSize: vars.fontSize.sizeBase,
	fontWeight: vars.fontWeight.medium,
	color: vars.color.blueGray,
	margin: 0,
});

export const iconStyle = style({
	color: vars.color.blue,
	width: 20,
	height: 20,
	flexShrink: 0,
});

export const scoreStyle = style({
	fontSize: 30,
	fontWeight: vars.fontWeight.extrabold,
	color: vars.color.black,
	margin: 0,
	marginTop: vars.spacing[1],
});

export const footerStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing[3],
	marginTop: vars.spacing[2],
});

export const diffBaseStyle = style({
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.light,
	color: vars.color.blueGray,
});

export const badgeStyle = style({
	borderRadius: vars.radius.sm,
	color: vars.color.blue,
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.semibold,
	backgroundColor: vars.color.blueAlpha10,
	paddingBlock: 2,
	paddingInline: vars.spacing[2],
	border: 'none',
});
