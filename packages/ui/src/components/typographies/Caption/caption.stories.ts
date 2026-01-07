import type { Meta, StoryObj } from '@storybook/react-vite';
import Caption from '.';
import { CaptionStyleVarient } from './caption.css';

const meta = {
	title: 'Design System/Atom/Typography/Caption',
	component: Caption,
	argTypes: {
		children: {
			control: 'text',
		},
		style: {
			control: 'select',
			options: Object.keys(CaptionStyleVarient),
		},
		textType: {
			control: 'select',
			options: ['small', 'span', 'p', 'div'],
		},
	},
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		textType: 'small',
		children: 'Caption Text',
		style: 'primary',
	},
};
