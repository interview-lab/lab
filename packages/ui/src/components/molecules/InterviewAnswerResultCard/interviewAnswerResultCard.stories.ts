import type { Meta, StoryObj } from '@storybook/react-vite';
import InterviewAnswerResultCard from '@/components/molecules/InterviewAnswerResultCard';

const meta = {
	title: 'Design System/Molecule/InterviewAnswerResultCard',
	component: InterviewAnswerResultCard,
} satisfies Meta<typeof InterviewAnswerResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 잘 답변한 질문 카드 */
export const Success: Story = {
	args: {
		variant: 'success',
		correctCount: 8,
		totalQuestions: 10,
	},
};

/** 보완이 필요한 질문 카드 */
export const Fail: Story = {
	args: {
		variant: 'fail',
		incorrectCount: 2,
	},
};

/** 보완이 필요한 질문 - 완벽 */
export const FailPerfect: Story = {
	args: {
		variant: 'fail',
		incorrectCount: 0,
	},
};

/** 보완이 필요한 질문 - 복습 권장 */
export const FailReviewRecommended: Story = {
	args: {
		variant: 'fail',
		incorrectCount: 2,
	},
};

/** 보완이 필요한 질문 - 집중 학습 필요 */
export const FailIntensiveStudy: Story = {
	args: {
		variant: 'fail',
		incorrectCount: 5,
	},
};
