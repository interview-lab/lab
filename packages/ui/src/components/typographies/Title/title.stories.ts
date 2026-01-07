import type { Meta, StoryObj } from '@storybook/react-vite';
import Title from '.';
import { TitleStyleVarient } from './title.css';

const meta = {
	title: 'Design System/Atom/Typography/Title',
	component: Title,
	argTypes: {
		children: {
			control: 'text',
		},
		style: {
			control: 'select',
			options: Object.keys(TitleStyleVarient),
		},
		textType: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
	},
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		textType: 'h1',
		children: 'badge',
		style: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		textType: 'h1',
		children: 'badge',
		style: 'secondary',
	},
};

export const Tertiary: Story = {
	args: {
		textType: 'h1',
		children: 'badge',
		style: 'tertiary',
	},
};
