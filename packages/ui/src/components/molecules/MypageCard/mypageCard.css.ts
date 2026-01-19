import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[2],
	fontFamily: vars.font.pretendard,
	padding: vars.spacing[5],
	borderRadius: vars.radius.md,
	backgroundColor: vars.color.white,
	minWidth: 330,
	minHeight: 110,
	boxSizing: 'border-box',
	border: `${vars.border.width1} ${vars.color.grayLight}`,
});

export const headerStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	margin: 0,
});

export const contentStyle = style({
	fontSize: vars.fontSize.size4xl,
	fontWeight: vars.fontWeight.extrabold,
	color: vars.color.black,
	margin: 0,
});

export const iconContainerStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 40,
	height: 40,
	borderRadius: vars.radius.md,
});

export const iconStyle = style({
	width: 24,
	height: 24,
});

export const captionStyle = style({
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.blueGray,
});
