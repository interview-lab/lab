import type { Meta, StoryObj } from '@storybook/react-vite';
import MypageCard from '@/components/molecules/MypageCard/MypageCard';

const meta = {
	title: 'Design System/Molecule/MypageCard',
	component: MypageCard,
	argTypes: {
		type: {
			control: 'select',
			options: ['bookmarked', 'complete', 'average'],
		},
		value: {
			control: 'number',
		},
	},
} satisfies Meta<typeof MypageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BookmarkedQuestion: Story = {
	args: {
		type: 'bookmarked',
		value: 12,
	},
};

export const CompletedInterview: Story = {
	args: {
		type: 'complete',
		value: 8,
	},
};

export const AverageScore: Story = {
	args: {
		type: 'average',
		value: 85,
	},
};
