import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectSubjectCard from '@/components/molecules/SelectSubjectCard';
import { SUBJECT_OPTIONS } from '@/components/molecules/SelectSubjectCard/subjectOptions';

const meta = {
	title: 'Design System/Molecule/SelectSubjectCard',
	component: SelectSubjectCard,
	argTypes: {
		option: {
			control: 'select',
			options: Object.keys(SUBJECT_OPTIONS),
		},
	},
} satisfies Meta<typeof SelectSubjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Network: Story = {
	args: {
		option: 'network',
	},
};

export const OS: Story = {
	args: {
		option: 'os',
	},
};

export const Backend: Story = {
	args: {
		option: 'backend',
	},
};

export const DataStructure: Story = {
	args: {
		option: 'dataStructure',
	},
};

export const Frontend: Story = {
	args: {
		option: 'frontend',
	},
};

export const Random: Story = {
	args: {
		option: 'random',
	},
};
