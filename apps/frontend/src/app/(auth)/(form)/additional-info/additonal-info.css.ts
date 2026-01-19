import { vars } from '@interview-lab/ui/theme';
import { style } from '@vanilla-extract/css';

export const emailFieldContainerStyle = style({
	display: 'flex',
	gap: vars.spacing['3'],
});

export const sendVerificationCodeButton = style({
	backgroundColor: '#192633',
	color: vars.color.white,
	height: 52,
	marginTop: 25,
});
