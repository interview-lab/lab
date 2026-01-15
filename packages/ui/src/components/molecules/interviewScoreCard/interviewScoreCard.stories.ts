import type { Meta, StoryObj } from '@storybook/react-vite';
import InterviewScoreCard from '@/components/molecules/interviewScoreCard/InterviewScoreCard';

const meta = {
	title: 'Design System/Molecule/InterviewScoreCard',
	component: InterviewScoreCard,
	argTypes: {
		score: {
			control: { type: 'number', min: 0, max: 100 },
			description: '점수 (0-100)',
		},
		percentile: {
			control: { type: 'number', min: 1, max: 100 },
			description: '상위 퍼센트',
		},
		scoreDiff: {
			control: { type: 'number', min: -100, max: 100 },
			description: '지난 세션 대비 점수 변화',
		},
	},
} satisfies Meta<typeof InterviewScoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		score: 85,
		percentile: 10,
		scoreDiff: 5,
	},
};
