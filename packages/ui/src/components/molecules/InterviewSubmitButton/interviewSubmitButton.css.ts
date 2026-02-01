import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const buttonContainer = style({
	height: 90,
	width: 672,
	border: `1px solid ${vars.color.grayLight}`,
	borderRadius: vars.radius.md,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: vars.spacing['4'],
	gap: vars.spacing['4'],
	boxSizing: 'border-box',
	fontFamily: vars.font.pretendard,
	boxShadow:
		'0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
});

globalStyle(`${buttonContainer} button`, {
	cursor: 'pointer',
	transition: 'flex-grow 1s ease',
});

globalStyle(`${buttonContainer} button:first-child`, {
	flex: 1,
	height: '100%',
	backgroundColor: vars.color.blue,
	color: vars.color.white,
	fontWeight: vars.fontWeight.semibold,
	fontSize: 18,
	boxShadow:
		'0 10px 15px -3px rgb(19 127 236 / 0.3), 0 4px 6px -4px rgb(19 127 236 / 0.3)',
	transition: 'background-color .5s ease, box-shadow .5s ease',
});

globalStyle(`${buttonContainer} button:first-child:hover`, {
	backgroundColor: vars.color.blueHover,
});

globalStyle(`${buttonContainer} button:first-child:active`, {
	backgroundColor: vars.color.blueActive,
	boxShadow:
		'0 4px 6px -1px rgb(19 127 236 / 0.2), 0 2px 4px -2px rgb(19 127 236 / 0.2)',
});

globalStyle(`${buttonContainer} button:first-child:disabled`, {
	backgroundColor: vars.color.grayLight,
	color: vars.color.gray,
	cursor: 'not-allowed',
	boxShadow: 'none',
});

export const muteButton = style({
	position: 'relative',

	transition: 'border-radius 1s ease',

	selectors: {
		'&[data-state="recording"]::after': {
			position: 'absolute',
			content: '',
			width: 18,
			height: 18,
			backgroundColor: vars.color.border.error,
			borderRadius: 2,
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},

		'&[data-state="paused"]::after': {
			position: 'absolute',
			content: '',
			width: 18,
			height: 18,
			backgroundColor: vars.color.border.error,
			borderRadius: 10,
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
	},
});
