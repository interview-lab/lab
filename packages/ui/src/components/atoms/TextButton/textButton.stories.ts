import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '../../../assets/svgs';
import TextButton from '.';

const meta = {
	title: 'Design System/Atom/TextButton',
	component: TextButton,
	argTypes: {
		icon: {
			control: 'select',
			options: [undefined, ...Object.keys(SvgIcons)],
		},
		showIcon: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof TextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Button Text',
		icon: undefined,
		showIcon: true,
	},
};
