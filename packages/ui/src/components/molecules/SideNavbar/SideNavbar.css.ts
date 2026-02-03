import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const sidebarStyle = style({
	width: 288,
	height: '100%',
	borderRight: `1px solid ${vars.color.grayLight}`,
	padding: vars.spacing[4],
	display: 'flex',
	flexDirection: 'column',
	fontFamily: vars.font.pretendard,
	boxSizing: 'border-box',
});

export const logoStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing[3],
	padding: vars.spacing[4],
	marginBottom: vars.spacing[4],
	color: vars.color.black,
	textDecoration: 'none',
	cursor: 'pointer',

	':hover': {
		color: vars.color.black,
	},
});

export const logoTitleStyle = style({
	fontSize: vars.fontSize.sizeLg,
	fontWeight: vars.fontWeight.bold,
	margin: 0,
});

export const navStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.spacing[2],
	margin: 0,
	padding: 0,
	listStyle: 'none',
});

export const navItemStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing[3],
	padding: `${vars.spacing[3]} ${vars.spacing[4]}`,
	borderRadius: vars.radius.default,
	color: vars.color.blueGray,
	textDecoration: 'none',
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.medium,
	transition: 'background-color 0.3s, color 0.3s',
	cursor: 'pointer',

	':hover': {
		backgroundColor: vars.color.blueAlpha10,
		color: vars.color.blue,
	},
});

export const navItemActiveStyle = style({
	backgroundColor: vars.color.blueAlpha10,
	color: vars.color.blue,
	fontWeight: vars.fontWeight.semibold,
	border: `1px solid ${vars.color.blueAlpha20}`,
});
