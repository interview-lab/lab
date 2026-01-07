import type { Meta, StoryObj } from '@storybook/react-vite';
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
		label: {
			control: 'text',
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
	},
};

export const ErrorWithMessage: Story = {
	args: {
		isError: true,
		errorMessage: 'This field is required',
		placeholder: 'Enter text...',
		disabled: false,
	},
};

export const ErrorWithoutMessage: Story = {
	args: {
		isError: true,
		placeholder: 'Enter text...',
		disabled: false,
	},
};
