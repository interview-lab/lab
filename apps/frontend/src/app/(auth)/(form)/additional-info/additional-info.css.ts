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

export const timerStyle = style({
	backgroundColor: vars.color.grayLight,
	color: vars.color.gray,
});
