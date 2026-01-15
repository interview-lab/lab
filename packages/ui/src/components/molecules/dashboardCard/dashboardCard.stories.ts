import type { Meta, StoryObj } from '@storybook/react-vite';
import DashboardCard from '@/components/molecules/dashboardCard/DashboardCard';

const meta = {
	title: 'Design System/Molecule/DashboardCard',
	component: DashboardCard,
	argTypes: {
		value: {
			control: { type: 'number' },
			description: '표시할 값',
		},
	},
} satisfies Meta<typeof DashboardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Questions Answered - 기본 스타일 */
export const Answered: Story = {
	args: {
		cardKey: 'answered',
		value: 124,
	},
};

/** Success Rate - 퍼센트 스타일 (녹색) */
export const SuccessRate: Story = {
	args: {
		cardKey: 'successRate',
		value: 78,
	},
};

/** Current Streak - 스트릭 스타일 (오렌지) */
export const Streak: Story = {
	args: {
		cardKey: 'streak',
		value: 7,
	},
};
