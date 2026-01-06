import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const badgeStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: 22,
	paddingInline: 10,
	paddingBlock: 2,
	border: '1px solid',
	borderRadius: vars.radius.full,
});
