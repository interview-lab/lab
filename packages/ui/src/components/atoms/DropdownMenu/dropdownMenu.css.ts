import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	position: 'relative',
	display: 'inline-block',
});

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: vars.spacing[3],
	minWidth: 142,
	minHeight: 42,
	borderRadius: vars.radius.default,
	fontFamily: vars.font.pretendard,
	fontSize: 14,
	fontWeight: vars.fontWeight.regular,
	color: vars.color.black,
	border: `${vars.border.width1} transparent`,
	cursor: 'pointer',
	transition: 'all 300ms',
	background: vars.color.white,
});

globalStyle(`${buttonStyle} p`, {
	margin: 0,
});

export const activeButtonStyle = style({
	border: `${vars.border.width1} ${vars.color.blue}`,
	color: vars.color.blue,
});

export const menuStyle = style({
	position: 'absolute',
	top: '100%',
	left: 0,
	right: 0,
	marginTop: 8,
	display: 'flex',
	flexDirection: 'column',
	border: 'none',
	borderRadius: vars.radius.default,
	zIndex: 10,
	background: vars.color.white,
});

export const menuItemStyle = style({
	width: '100%',
	padding: vars.spacing[3],
	cursor: 'pointer',
	transition: 'all 300ms',
	background: 'none',
	border: 'none',
	fontFamily: vars.font.pretendard,
	fontSize: 14,
	fontWeight: vars.fontWeight.regular,
	color: vars.color.black,
	textAlign: 'left',
	selectors: {
		'&:hover': {
			color: vars.color.blue,
		},
		'&:first-child': {
			borderRadius: `${vars.radius.default} ${vars.radius.default} 0 0`,
		},
		'&:last-child': {
			borderRadius: `0 0 ${vars.radius.default} ${vars.radius.default}`,
		},
		'&:only-child': {
			borderRadius: vars.radius.default,
		},
	},
});

export const activeMenuItemStyle = style({
	color: vars.color.blue,
});
