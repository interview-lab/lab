import { vars } from '@interview-lab/ui/theme';
import { style } from '@vanilla-extract/css';

export const formStyle = style({
	width: '100%',
	marginTop: vars.spacing['8'],
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	gap: vars.spacing['5'],
});

export const buttonStyle = style({
	backgroundColor: vars.color.blue,
	color: vars.color.white,
});
