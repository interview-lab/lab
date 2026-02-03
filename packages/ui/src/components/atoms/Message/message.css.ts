import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const messageContainerStyle = style({
	boxShadow: '0 8px 16px rgba(0 0 0 /0.08)',
	borderRadius: 16,
	padding: 20,
	maxWidth: '80%',
	wordBreak: 'keep-all',

	selectors: {
		'&[data-type="sent"]': {
			alignSelf: 'flex-end',
			backgroundColor: vars.color.blue,
			color: vars.color.white,
			borderBottomRightRadius: 0,
			boxShadow:
				'0 10px 15px -3px rgba(0 0 0/ 0.1), 0 4px 6px -4px rgba(0 0 0/ 0.1)',
		},
		'&[data-type="received"]': {
			alignSelf: 'flex-start',
			backgroundColor: vars.color.white,
			border: `1px solid ${vars.color.grayLight}`,
			borderBottomLeftRadius: 0,
		},
	},
});
