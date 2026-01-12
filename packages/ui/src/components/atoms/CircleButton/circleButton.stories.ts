import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '@/assets/svgs';
import CircleButton from '.';

const meta = {
	title: 'Design System/Atom/CircleButton',
	component: CircleButton,
	argTypes: {
		icon: {
			control: 'select',
			options: [undefined, ...Object.keys(SvgIcons)],
		},
	},
} satisfies Meta<typeof CircleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		icon: 'IconMute',
	},
};
