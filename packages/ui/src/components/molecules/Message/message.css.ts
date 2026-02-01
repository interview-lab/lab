import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const messageContainerStyle = style({
	position: 'relative',
	boxShadow: '0 8px 16px rgba(0 0 0 /0.08)',
	borderRadius: 16,
	padding: 20,

	selectors: {
		'&[data-type="sent"]': {
			alignSelf: 'flex-end',
			backgroundColor: vars.color.blue,
			color: vars.color.white,
			borderBottomRightRadius: 0,

			boxShadow:
				'0 10px 15px -3px rgba(0 0 0/ 0.1), 0 4px 6px -4px rgba(0 0 0/ 0.1)',
		},
		'&[data-type="sent"]::after': {
			content: '',
			position: 'absolute',
			filter:
				'0 10px 15px -3px rgba(0 0 0/ 0.1), 0 4px 6px -4px rgba(0 0 0/ 0.1)',
			backgroundColor: vars.color.blue,
			width: 20,
			height: 20,
			bottom: -20,
			right: 0,
			clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
		},

		'&[data-type="received"]': {
			alignSelf: 'flex-start',
			backgroundColor: vars.color.white,
			border: `1px solid ${vars.color.grayLight}`,
			borderBottomLeftRadius: 0,
		},
		'&[data-type="received"]::before': {
			content: '',
			position: 'absolute',
			backgroundColor: vars.color.grayLight,
			width: 22,
			height: 22,
			bottom: -22,
			left: -1,
			clipPath: 'polygon(0 0, 100% 0, 0 100%)',
		},
		'&[data-type="received"]::after': {
			content: '',
			position: 'absolute',
			backgroundColor: vars.color.white,
			width: 20,
			height: 20,
			bottom: -20,
			left: 0,
			clipPath: 'polygon(0 0, 100% 0, 0 100%)',
			filter: 'drop-shadow(0 4px 8px rgba(0 0 0 / 0.08))',
		},
	},
});
