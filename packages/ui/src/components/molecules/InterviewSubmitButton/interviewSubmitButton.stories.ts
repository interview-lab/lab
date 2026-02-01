import type { Meta, StoryObj } from '@storybook/react-vite';
import InterviewSubmitButton from '@/components/molecules/InterviewSubmitButton';

const meta = {
	title: 'Design System/Molecule/InterviewSubmitButton',
	component: InterviewSubmitButton,
} satisfies Meta<typeof InterviewSubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
	args: {
		state: 'idle',
	},
};

export const Recording: Story = {
	args: {
		state: 'recording',
	},
};

export const Paused: Story = {
	args: {
		state: 'paused',
	},
};

export const Processing: Story = {
	args: {
		state: 'processing',
	},
};
