import { vars } from '@interview-lab/ui/theme';
import { style } from '@vanilla-extract/css';

export const layoutStyle = style({
	display: 'flex',
	height: '100%',
});

export const mainStyle = style({
	flex: 1,
	padding: vars.spacing[6],
	paddingTop: vars.spacing[10],
	overflow: 'auto',
	display: 'flex',
	justifyContent: 'center',
});
