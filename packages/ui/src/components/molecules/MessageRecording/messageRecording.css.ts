import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const badgeStyle = style({
	backgroundColor: 'rgba(255 255 255 / 0.2)',
	borderColor: 'rgba(255 255 255 / 0.3)',
	gap: vars.spacing['2'],
	paddingInline: vars.spacing['4'],
	fontWeight: vars.fontWeight.semibold,
	fontSize: vars.fontSize.sizeXs,
});

export const timeStyle = style({
	paddingBlock: vars.spacing['2'],
	margin: 0,
	fontWeight: vars.fontWeight.bold,
	fontSize: 48,
	textAlign: 'center',
});

export const canvasStyle = style({
	width: '100%',
	height: 80,
	display: 'block',
});
