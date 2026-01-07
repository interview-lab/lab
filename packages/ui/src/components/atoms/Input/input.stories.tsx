import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '../../../assets/svgs';
import Icon from '../Icon';
import Input from '.';

const meta = {
	title: 'Design System/Atom/Input',
	component: Input,
	argTypes: {
		disabled: {
			control: 'boolean',
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
		id: 'input-default',
	},
};

export const Placeholder: Story = {
	args: {
		disabled: false,
		id: 'input-placeholder',
		placeholder: 'Placeholder',
	},
};

export const WithLeftIcon: Story = {
	args: {
		disabled: false,
		label: 'Input Label',
		id: 'input-label',
	},

	render: (args) => (
		<Input {...args} leftIcon={<Icon icon="IconExclamationCircle" />} />
	),
};

export const WithRightIcon: Story = {
	args: {
		disabled: false,
		label: 'Input Label',
		id: 'input-label',
	},

	render: (args) => (
		<Input {...args} rightIcon={<Icon icon="IconExclamationCircle" />} />
	),
};
