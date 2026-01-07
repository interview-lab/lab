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
		label: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
		icon: undefined,
		id: 'input-default',
	},
};

export const Placeholder: Story = {
	args: {
		disabled: false,
		icon: undefined,
		id: 'input-placeholder',
		placeholder: 'Placeholder',
	},
};

export const WithLabel: Story = {
	args: {
		disabled: false,
		icon: undefined,
		label: 'Input Label',
		id: 'input-label',
	},
};
