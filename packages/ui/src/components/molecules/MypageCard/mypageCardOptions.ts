import { vars } from '@/styles/theme.css';

export const CARD_CONFIG = {
	bookmarked: {
		icon: 'IconBookMark',
		color: vars.color.blue,
		bgColor: vars.color.blueAlpha10,
		caption: '북마크한 질문',
		format: (value: number) => `${value}`,
	},
	complete: {
		icon: 'IconReplay',
		color: vars.color.green,
		bgColor: vars.color.greenAlpha10,
		caption: '완료한 면접',
		format: (value: number) => `${value}`,
	},
	average: {
		icon: 'IconGraph',
		color: vars.color.purple,
		bgColor: vars.color.purpleAlpha10,
		caption: '평균 점수',
		format: (value: number) => `${value}%`,
	},
} as const;

export type CardType = keyof typeof CARD_CONFIG;
