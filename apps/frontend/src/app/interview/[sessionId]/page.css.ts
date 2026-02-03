import { vars } from '@interview-lab/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const pageStyle = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: vars.spacing['8'],
	maxWidth: '1200px',
	marginInline: 'auto',
});

export const buttonContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: vars.spacing['3'],
});

globalStyle(`${buttonContainerStyle} p`, {
	fontSize: vars.fontSize.sizeXs,
	color: vars.color.gray,
});

export const questionContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: vars.spacing['8'],
	flexGrow: 1,
	alignSelf: 'stretch',
});

export const questionTextStyle = style({
	fontSize: 24,
	fontWeight: vars.fontWeight.bold,
	marginBlock: vars.spacing['4'],
});

export const tipTextStyle = style({
	fontSize: vars.fontSize.sizeBase,
	color: vars.color.gray,
});
