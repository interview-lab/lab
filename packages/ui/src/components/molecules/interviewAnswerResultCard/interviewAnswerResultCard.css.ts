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
	justifyContent: 'space-between',
});

export const titleStyle = style({
	fontSize: vars.fontSize.sizeBase,
	fontWeight: vars.fontWeight.medium,
	color: vars.color.blueGray,
	margin: 0,
});

export const iconSuccessStyle = style({
	color: vars.color.green,
	width: 24,
	height: 24,
	minWidth: 24,
	minHeight: 24,
	flexShrink: 0,
});

export const iconFailStyle = style({
	color: vars.color.orange,
	width: 24,
	height: 24,
	minWidth: 24,
	minHeight: 24,
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
	gap: vars.spacing[2],
	marginTop: vars.spacing[2],
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.medium,
});

export const footerSuccessStyle = style([
	footerStyle,
	{
		color: vars.color.green,
	},
]);

export const footerFailStyle = style([
	footerStyle,
	{
		color: vars.color.orange,
	},
]);

export const footerIconStyle = style({
	width: 18,
	height: 18,
	minWidth: 18,
	minHeight: 18,
	flexShrink: 0,
	color: 'inherit',
});
