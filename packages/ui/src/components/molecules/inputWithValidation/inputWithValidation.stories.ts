import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '@/assets/svgs';
import InputWithValidation from './InputWithValidation';

const meta = {
	title: 'Design System/Molecule/InputWithValidation',
	component: InputWithValidation,
	argTypes: {
		isError: {
			control: 'boolean',
			description: 'Whether the input is in error state',
		},
		errorMessage: {
			control: 'text',
			if: { arg: 'isError', truthy: true },
		},
		placeholder: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
		value: {
			control: 'text',
			description: 'Input value',
		},
		icon: {
			control: 'select',
			options: [undefined, ...Object.keys(SvgIcons)],
		},
	},
} satisfies Meta<typeof InputWithValidation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isError: false,
		placeholder: 'Enter text...',
		disabled: false,
		icon: undefined,
	},
};

export const ErrorWithMessage: Story = {
	args: {
		isError: true,
		errorMessage: 'This field is required',
		placeholder: 'Enter text...',
		disabled: false,
		icon: undefined,
	},
};

export const ErrorWithoutMessage: Story = {
	args: {
		isError: true,
		placeholder: 'Enter text...',
		disabled: false,
		icon: undefined,
	},
};
