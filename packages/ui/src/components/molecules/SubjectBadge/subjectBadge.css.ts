import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const badgeStyle = style({
	gap: vars.spacing['2'],
	paddingInline: vars.spacing['4'],
	fontWeight: vars.fontWeight.semibold,
	fontSize: vars.fontSize.sizeXs,
	color: vars.color.blue,
	backgroundColor: vars.color.blueAlpha10,
	border: `1px solid ${vars.color.blueAlpha30}`,

	selectors: {
		'&[data-type="os"]': {
			color: vars.color.blue,
			backgroundColor: vars.color.blueAlpha10,
			borderColor: vars.color.blueAlpha30,
		},
		'&[data-type="database"]': {
			color: vars.color.green,
			backgroundColor: vars.color.greenAlpha10,
			borderColor: vars.color.greenAlpha20,
		},
		'&[data-type="network"]': {
			color: vars.color.orange,
			backgroundColor: vars.color.orangeAlpha10,
			borderColor: vars.color.orangeAlpha20,
		},
		'&[data-type="algorithm"]': {
			color: vars.color.purple,
			backgroundColor: vars.color.purpleAlpha10,
			borderColor: 'rgba(168, 85, 247, 0.2)',
		},
		'&[data-type="data-structure"]': {
			color: '#EF4444',
			backgroundColor: 'rgba(239, 68, 68, 0.1)',
			borderColor: 'rgba(239, 68, 68, 0.2)',
		},
		'&[data-type="frontend"]': {
			color: '#06B6D4',
			backgroundColor: 'rgba(6, 182, 212, 0.1)',
			borderColor: 'rgba(6, 182, 212, 0.2)',
		},
		'&[data-type="backend"]': {
			color: '#EC4899',
			backgroundColor: 'rgba(236, 72, 153, 0.1)',
			borderColor: 'rgba(236, 72, 153, 0.2)',
		},
	},
});
