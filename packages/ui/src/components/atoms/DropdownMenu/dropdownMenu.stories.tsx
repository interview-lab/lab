import type { Meta, StoryObj } from '@storybook/react-vite';
import DropdownMenu from '.';

const meta = {
	title: 'Design System/Atom/DropdownMenu',
	component: DropdownMenu,
	argTypes: {
		defaultLabel: {
			control: 'text',
		},
	},
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		defaultLabel: '모든 카테고리',
		items: [
			{ label: '카테고리 1', value: 'category1' },
			{ label: '카테고리 2', value: 'category2' },
			{ label: '카테고리 3', value: 'category3' },
		],
	},
};

export const WithSelection: Story = {
	args: {
		defaultLabel: '모든 카테고리',
		defaultValue: 'category2',
		items: [
			{ label: '카테고리 1', value: 'category1' },
			{ label: '카테고리 2', value: 'category2' },
			{ label: '카테고리 3', value: 'category3' },
		],
	},
};
