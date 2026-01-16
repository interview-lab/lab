import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[2],
	fontFamily: vars.font.pretendard,
	padding: vars.spacing[6],
	borderRadius: vars.radius.default,
	boxSizing: 'border-box',
	minWidth: 298,
	minHeight: 135,
	boxShadow: vars.shadow.sm,
	border: `1px solid ${vars.color.grayLight}`,
	backgroundColor: vars.color.white,
});

export const headerStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing[3],
});

export const titleStyle = style({
	fontFamily: vars.font.pretendard,
	fontSize: vars.fontSize.sizeBase,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.black,
	margin: 0,
});

const iconBaseStyle = style({
	width: 40,
	height: 40,
	padding: vars.spacing[1],
	borderRadius: vars.radius.full,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const iconVariantStyle = styleVariants({
	default: [
		iconBaseStyle,
		{
			backgroundColor: vars.color.blueAlpha10,
		},
	],
	percentage: [
		iconBaseStyle,
		{
			backgroundColor: vars.color.greenAlpha10,
		},
	],
	streak: [
		iconBaseStyle,
		{
			backgroundColor: vars.color.orangeAlpha10,
		},
	],
});

export const valueStyle = style({
	fontFamily: vars.font.pretendard,
	fontSize: vars.fontSize.size4xl,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.black,
	margin: 0,
	marginTop: vars.spacing[2],
});

export const iconColorStyle = styleVariants({
	default: {
		color: vars.color.blue,
	},
	percentage: {
		color: vars.color.green,
	},
	streak: {
		color: vars.color.orange,
	},
});
