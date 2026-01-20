import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from '@/components/molecules/Header';

const meta = {
	title: 'Design System/Molecule/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
