import type { Meta, StoryObj } from '@storybook/react-vite';
import * as SvgIcons from '../../../assets/svgs';
import { vars } from '../../../styles/theme.css';
import Icon from '.';

const meta = {
	title: 'Design System/Atom/Icon',
	component: Icon,
	args: { color: 'black', icon: 'IconCheck' },
	argTypes: {
		icon: {
			control: 'select',
			options: Object.keys(SvgIcons),
		},
		color: {
			control: 'select',
			options: Object(vars.color),
		},
	},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
