import type { Meta, StoryObj } from '@storybook/react-vite';
import Message from '@/components/atoms/Message';

const meta = {
	title: 'Design System/Atom/Message',
	component: Message,
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sent: Story = {
	args: {
		type: 'sent',
		children: 'Sent message',
	},
};

export const Received: Story = {
	args: {
		type: 'received',
		children: 'Received message',
	},
};
