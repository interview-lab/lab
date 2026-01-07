import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '../../../assets/svgs';
import Input from '.';

const meta = {
	title: 'Design System/Atom/Input',
	component: Input,
	argTypes: {
		disabled: {
			control: 'boolean',
		},
		icon: {
			control: 'select',
			options: [undefined, ...Object.keys(SvgIcons)],
		},
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		disabled: false,
		icon: undefined,
	},
};
