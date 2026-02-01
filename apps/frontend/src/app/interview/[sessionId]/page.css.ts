import { vars } from '@interview-lab/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const pageStyle = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: vars.spacing['8'],
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
	gap: vars.spacing['2'],
	flexGrow: 1,
});
