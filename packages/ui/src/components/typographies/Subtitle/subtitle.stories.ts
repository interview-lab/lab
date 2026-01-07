import type { Meta, StoryObj } from '@storybook/react-vite';
import Subtitle from '.';
import { SubtitleStyleVarient } from './subtitle.css';

const meta = {
	title: 'Design System/Atom/Typography/Subtitle',
	component: Subtitle,
	argTypes: {
		children: {
			control: 'text',
		},
		style: {
			control: 'select',
			options: Object.keys(SubtitleStyleVarient),
		},
		textType: {
			control: 'select',
			options: ['p', 'h6', 'div', 'span'],
		},
	},
} satisfies Meta<typeof Subtitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		textType: 'p',
		children: 'Subtitle Text',
		style: 'primary',
	},
};
