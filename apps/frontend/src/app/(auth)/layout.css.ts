import { vars } from '@interview-lab/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const authLayoutStyle = style({
	display: 'flex',
	height: '100%',
});

export const column1Style = style({
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
});

export const formContainerStyle = style({
	minWidth: 448,
});

globalStyle(`${formContainerStyle} h2+p`, {
	marginTop: vars.spacing['3'],
	marginBottom: vars.spacing['8'],
	color: vars.color.gray,
});

export const column2Style = style({
	position: 'relative',
	flex: 1,
	display: 'flex',
	flexDirection: 'column-reverse',

	'::after': {
		content: '""',
		position: 'absolute',
		pointerEvents: 'none',
		background:
			'linear-gradient(to bottom, rgba(19, 127, 236, 0.2) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 1) 100%)',
		inset: 0,
		zIndex: 0,
	},
});

export const authImageStyle = style({
	objectFit: 'cover',
	zIndex: -1,
});

export const authImageContentStyle = style({
	padding: vars.spacing['20'],
	color: 'black',
	zIndex: 10,
});

globalStyle(`${authImageContentStyle} h2`, {
	marginBlock: vars.spacing['4'],
});

globalStyle(`${authImageContentStyle} p`, {
	color: vars.color.gray,
	lineHeight: 1.6,
});

export const iconContainerStyle = style({
	border: `1px solid ${vars.color.blueAlpha20}`,
	backgroundColor: vars.color.blueAlpha10,
	cursor: 'default',

	selectors: {
		'& + &': {
			marginLeft: vars.spacing['2'],
		},
	},
});

globalStyle(`${iconContainerStyle} svg`, {
	color: vars.color.blue,
});
