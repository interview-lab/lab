import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '@/assets/svgs';
import SquareButton from '.';

const meta = {
	title: 'Design System/Atom/SquareButton',
	component: SquareButton,
	argTypes: {
		active: {
			control: 'boolean',
		},
		icon: {
			control: 'select',
			options: [undefined, ...Object.keys(SvgIcons)],
		},
	},
} satisfies Meta<typeof SquareButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		active: false,
		icon: undefined,
	},
};
