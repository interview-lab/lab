import type { Meta, StoryObj } from '@storybook/react-vite';
import SubjectBadge from '@/components/molecules/SubjectBadge';

const meta = {
	title: 'Design System/Molecule/SubjectBadge',
	component: SubjectBadge,
} satisfies Meta<typeof SubjectBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OS: Story = {
	args: {
		type: 'os',
	},
};

export const Database: Story = {
	args: {
		type: 'database',
	},
};

export const Network: Story = {
	args: {
		type: 'network',
	},
};

export const Algorithm: Story = {
	args: {
		type: 'algorithm',
	},
};

export const DataStructure: Story = {
	args: {
		type: 'data-structure',
	},
};

export const Frontend: Story = {
	args: {
		type: 'frontend',
	},
};

export const Backend: Story = {
	args: {
		type: 'backend',
	},
};
