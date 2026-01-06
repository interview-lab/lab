import type { Meta, StoryObj } from '@storybook/react-vite';
import Base from '.';
import { BaseStyleVarient } from './base.css';

const meta = {
	title: 'Design System/Atom/Typography/Base',
	component: Base,
	argTypes: {
		children: {
			control: 'text',
		},
		style: {
			control: 'select',
			options: Object.keys(BaseStyleVarient),
		},
		textType: {
			control: 'select',
			options: ['p', 'span', 'div', 'label'],
		},
	},
} satisfies Meta<typeof Base>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		textType: 'p',
		children: 'Base Text',
		style: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		textType: 'p',
		children: 'Base Text',
		style: 'secondary',
	},
};
