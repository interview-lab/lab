import type { Meta, StoryObj } from '@storybook/react-vite';
import Header, {
	logoStyle,
	navLinkStyle,
	titleStyle,
	userProfileButtonStyle,
	userProfileImageStyle,
} from '@/components/molecules/Header';
import { Icon, TextButton } from '@/components/atoms';
import defaultUserImage from '@/assets/image/default-user-image.jpeg';

const meta = {
	title: 'Design System/Molecule/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const logo = (
	<a href="/" className={logoStyle}>
		<Icon icon="IconTerminal" width={24} height={24} />
		<h1 className={titleStyle}>DevInterview</h1>
	</a>
);

const navItems = [
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
];

export const LoggedOut: Story = {
	render: () => (
		<Header
			logo={logo}
			navItems={[<TextButton key="login">Login</TextButton>]}
		/>
	),
};

export const LoggedIn: Story = {
	render: () => (
		<Header
			logo={logo}
			navItems={[
				...navItems,
				<button key="profile" type="button" className={userProfileButtonStyle}>
					<img
						src={defaultUserImage}
						alt="User profile"
						className={userProfileImageStyle}
					/>
				</button>,
			]}
		/>
	),
};
