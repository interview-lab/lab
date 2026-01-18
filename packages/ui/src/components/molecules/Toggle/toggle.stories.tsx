import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Toggle, { type ToggleItem } from '@/components/molecules/Toggle';

const meta = {
	title: 'Design System/Molecule/Toggle',
	component: Toggle,
	argTypes: {
		selectedValue: {
			control: 'select',
		},
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTION_1 = {
	label: '파일',
	value: 'file',
} satisfies ToggleItem;

const OPTION_2 = {
	label: '폴더',
	value: 'directory',
} satisfies ToggleItem;

const OPTION_3 = {
	label: '모두',
	value: 'all',
} satisfies ToggleItem;

export const Single: Story = {
	render: () => {
		const [selectedValue, setSelectedValue] = useState<ToggleItem['value']>(
			OPTION_1.value,
		);

		return (
			<Toggle
				items={[OPTION_1]}
				selectedValue={selectedValue}
				onSelect={(value) => {
					setSelectedValue(value);
				}}
			/>
		);
	},

	args: {
		items: [OPTION_1],
		selectedValue: OPTION_1.value,
		onSelect: () => {},
	},
};

export const Binary: Story = {
	render: () => {
		const [selectedValue, setSelectedValue] = useState<ToggleItem['value']>(
			OPTION_1.value,
		);

		return (
			<Toggle
				items={[OPTION_1, OPTION_2]}
				selectedValue={selectedValue}
				onSelect={(value) => {
					setSelectedValue(value);
				}}
			/>
		);
	},

	args: {
		items: [OPTION_1, OPTION_2],
		selectedValue: OPTION_1.value,
		onSelect: () => {},
	},
};

export const Multi: Story = {
	render: () => {
		const [selectedValue, setSelectedValue] = useState<ToggleItem['value']>(
			OPTION_1.value,
		);

		return (
			<Toggle
				items={[OPTION_1, OPTION_2, OPTION_3]}
				selectedValue={selectedValue}
				onSelect={(value) => {
					setSelectedValue(value);
				}}
			/>
		);
	},

	args: {
		items: [OPTION_1, OPTION_2, OPTION_3],
		selectedValue: OPTION_1.value,
		onSelect: () => {},
	},
};
