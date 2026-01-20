import type { Meta, StoryObj } from '@storybook/react-vite';
import Header, { navLinkStyle } from '@/components/molecules/Header';
import { Icon } from '@/components/atoms';

const meta = {
	title: 'Design System/Molecule/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	render: (args) => (
		<Header
			{...args}
			navItems={[
				<a key="dashboard" href="/dashboard" className={navLinkStyle}>
					<Icon icon="IconDashboard" width={24} height={24} />
					Dashboard
				</a>,
				<a key="practice" href="/practice" className={navLinkStyle}>
					<Icon icon="IconCode" width={24} height={24} />
					Practice
				</a>,
				<a key="history" href="/history" className={navLinkStyle}>
					<Icon icon="IconReplay" width={24} height={24} />
					History
				</a>,
				<a key="setting" href="/setting" className={navLinkStyle}>
					<Icon icon="IconSetting" width={24} height={24} />
					Setting
				</a>,
			]}
		/>
	),
};
