import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const containerStyle = style({
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingBlock: vars.spacing[3],
	paddingInline: vars.spacing[10],
	fontFamily: vars.font.pretendard,
	background: vars.color.white,
	boxSizing: 'border-box',
});

export const logoStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing[2],
	cursor: 'pointer',
});

export const titleStyle = style({
	fontSize: vars.fontSize.sizeBase,
	fontWeight: vars.fontWeight.bold,
});

export const navStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing[8],
	margin: 0,
	padding: 0,
	listStyle: 'none',
});

export const navButtonStyle = style({
	gap: vars.spacing[2],
	minWidth: 'auto',
	padding: vars.spacing[2],
	background: 'transparent',
	fontWeight: vars.fontWeight.regular,
	cursor: 'pointer',
});

export const userProfileButtonStyle = style({
	width: 40,
	height: 40,
	borderRadius: '50%',
	overflow: 'hidden',
	border: 'none',
	padding: 0,
	cursor: 'pointer',
});

export const userProfileImageStyle = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});
