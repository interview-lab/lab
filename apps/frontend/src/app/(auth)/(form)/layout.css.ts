import { vars } from '@interview-lab/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const dividerStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing['4'],
	color: vars.color.gray,
	marginBlock: vars.spacing['8'],

	'::before': {
		content: '""',
		flex: 1,
		height: '1px',
		backgroundColor: vars.color.grayLight,
	},

	'::after': {
		content: '""',
		flex: 1,
		height: '1px',
		backgroundColor: vars.color.grayLight,
	},
});

export const socialButtonContainerStyle = style({
	display: 'flex',
	gap: vars.spacing['4'],
});

globalStyle(`${socialButtonContainerStyle} > *`, {
	flexGrow: 1,
});

globalStyle(`${socialButtonContainerStyle}  button`, {
	backgroundColor: '#F0F2F5',
	color: vars.color.grayDark,
	width: '100%',
});

globalStyle(`${socialButtonContainerStyle} button > svg`, {
	width: '20px',
	height: '20px',
});

export const signUpLinkStyle = style({
	color: vars.color.gray,
	textAlign: 'center',
	marginTop: vars.spacing['16'],
});

globalStyle(`${signUpLinkStyle} strong`, {
	fontWeight: 'bold',
	color: vars.color.blue,
});
