import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonText from '@/components/typographies/ButtonText';
import { ButtonStyleVariant } from '@/components/typographies/ButtonText/button.css';

const meta = {
	title: 'Design System/Atom/Typography/Button',
	component: ButtonText,
	argTypes: {
		children: {
			control: 'text',
		},
		style: {
			control: 'select',
			options: Object.keys(ButtonStyleVariant),
		},
		textType: {
			control: 'select',
			options: ['span', 'p', 'div', 'strong', 'label'],
		},
	},
} satisfies Meta<typeof ButtonText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		textType: 'span',
		children: 'Button Text',
		style: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		textType: 'span',
		children: 'Button Text',
		style: 'secondary',
	},
};
