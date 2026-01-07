import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '.';

const meta = {
	title: 'Design System/Atom/Badge',
	component: Badge,
	argTypes: {
		children: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'badge',
	},
};
