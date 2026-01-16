import type * as Icons from '@/assets/svgs';

export type DashboardCardVariant = 'default' | 'percentage' | 'streak';

export type IconKey = keyof typeof Icons;

type DashboardCardConfig = {
	title: string;
	iconKey: IconKey;
	variant: DashboardCardVariant;
	formatter: (v: number) => string;
};

export const DASHBOARD_CARD_CONFIG = {
	answered: {
		title: 'Questions Answered',
		iconKey: 'IconHelp',
		variant: 'default',
		formatter: (v: number) => v.toLocaleString(),
	},
	successRate: {
		title: 'Success Rate',
		iconKey: 'IconCheckCircle',
		variant: 'percentage',
		formatter: (v: number) => `${v}%`,
	},
	streak: {
		title: 'Current Streak',
		iconKey: 'IconFire',
		variant: 'streak',
		formatter: (v: number) => `${v} Days`,
	},
} as const satisfies Record<string, DashboardCardConfig>;

export type DashboardCardKey = keyof typeof DASHBOARD_CARD_CONFIG;
