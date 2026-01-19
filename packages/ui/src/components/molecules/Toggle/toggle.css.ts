import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const toggleStyle = style({
	backgroundColor: '#E2E8F0',
	display: 'flex',
	alignItems: 'center',
	borderRadius: vars.radius.md,
	padding: vars.spacing['1'],
	boxSizing: 'border-box',
});

export const toggleButtonStyle = style({
	borderRadius: vars.radius.md,
	backgroundColor: 'transparent',
	height: 40,
	minWidth: 80,
	paddingInline: vars.spacing['3'],
	border: 'none',
	flex: 1,
	flexShrink: 0,
	color: '#4B5563',
	cursor: 'pointer',
	fontFamily: vars.font.pretendard,
	fontWeight: vars.fontWeight.semibold,
	transition: 'background-color 0.2s, color 0.2s',
	boxSizing: 'border-box',
	textAlign: 'center',
});

export const toggleButtonActiveStyle = style({
	backgroundColor: 'white',
	color: '#1E293B',
});
