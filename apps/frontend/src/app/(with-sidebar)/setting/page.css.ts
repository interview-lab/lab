import { vars } from '@interview-lab/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const mainStyle = style({
	maxWidth: 768,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[8],
});

export const sectionStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 32,
});

export const articleStyle = style({
	color: vars.color.black,
	padding: vars.spacing[8],
	display: 'flex',
	flexDirection: 'column',
	fontFamily: vars.font.pretendard,
	gap: vars.spacing[6],
	borderRadius: vars.radius.md,
	border: `1px solid ${vars.color.grayLight}`,
	boxShadow: vars.shadow.sm,
});

globalStyle(`${articleStyle} h2`, {
	fontSize: vars.fontSize.sizeXl,
	color: vars.color.black,
	fontWeight: vars.fontWeight.bold,
	lineHeight: '24px',
});

globalStyle(`${articleStyle} span`, {
	fontSize: vars.fontSize.sizeBase,
	color: vars.color.black,
	fontWeight: vars.fontWeight.semibold,
});

globalStyle(`${articleStyle} h3`, {
	fontSize: vars.fontSize.sizeSm,
	color: vars.color.blueGray,
	fontWeight: vars.fontWeight.medium,
});

globalStyle(`${articleStyle} p`, {
	fontSize: vars.fontSize.sizeSm,
	color: vars.color.blueGray,
	fontWeight: vars.fontWeight.regular,
	lineHeight: 1.6,
});

export const headerStyle = style({
	fontFamily: vars.font.pretendard,
	fontSize: vars.fontSize.size4xl,
	fontWeight: vars.fontWeight.bold,
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[2],
});

globalStyle(`${headerStyle} p`, {
	fontSize: vars.fontSize.sizeBase,
	color: vars.color.blueGray,
	fontWeight: vars.fontWeight.regular,
});

export const profileRowStyle = style({
	display: 'flex',
	flexDirection: 'row',
	gap: 32,
});

globalStyle(`${profileRowStyle} > div`, {
	flex: 1,
	maxWidth: 335,
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
});

export const buttonGroupStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[3],
});

export const buttonStyle = style({
	border: `1px solid ${vars.color.grayLight}`,

	':hover': {
		backgroundColor: vars.color.grayLight,
	},
});
