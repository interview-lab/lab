import type { Meta, StoryObj } from '@storybook/react-vite';
import InterviewAnswerResultCard from '@/components/molecules/interviewAnswerResultCard/InterviewAnswerResultCard';

const meta = {
	title: 'Design System/Molecule/InterviewAnswerResultCard',
	component: InterviewAnswerResultCard,
	argTypes: {
		variant: {
			control: 'radio',
			options: ['success', 'fail'],
			description: '카드 타입',
		},
		correctCount: {
			control: { type: 'number', min: 0, max: 10 },
			description: '맞은 문제 수',
		},
		incorrectCount: {
			control: { type: 'number', min: 0, max: 10 },
			description: '틀린 문제 수',
		},
	},
} satisfies Meta<typeof InterviewAnswerResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'success',
		correctCount: 8,
		incorrectCount: 2,
	},
};
