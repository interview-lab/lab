import type { Meta, StoryObj } from '@storybook/react-vite';
import AnswerActiveBar from '.';

const meta: Meta<typeof AnswerActiveBar> = {
	title: 'Design System/Molecule/AnswerActiveBar',
	component: AnswerActiveBar,
	decorators: [
		(Story) => (
			<div style={{ width: 672 }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		onSend: { action: 'send' },
		onMuteToggle: { action: 'muteToggle' },
	},
};

export default meta;
type Story = StoryObj<typeof AnswerActiveBar>;

export const Default: Story = {};

export const Muted: Story = {
	args: {
		isMuted: true,
	},
};
