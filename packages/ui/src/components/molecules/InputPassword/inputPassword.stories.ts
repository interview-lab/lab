import type { Meta, StoryObj } from '@storybook/react-vite';
import InputPassword from '.';

const meta = {
	title: 'Design System/Molecule/InputPassword',
	component: InputPassword,
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
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordVisible: Story = {
	args: {
		isError: false,
		placeholder: 'Enter password...',
		disabled: false,
	},
};

export const PasswordHidden: Story = {
	args: {
		isError: false,
		placeholder: 'Enter password...',
		disabled: false,
	},
};
