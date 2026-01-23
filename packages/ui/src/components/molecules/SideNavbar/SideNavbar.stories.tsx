import type { Meta, StoryObj } from '@storybook/react-vite';
import type { NavItem } from '../../../../dist';
import SquareButton from '../../atoms/SquareButton';
import SideNavbar, { logoStyle, logoTitleStyle } from '.';

const meta = {
	title: 'Design System/Molecule/SideNavbar',
	component: SideNavbar,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof SideNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = (
	<a href="/" className={logoStyle}>
		<SquareButton icon="IconCode" active />
		<h1 className={logoTitleStyle}>Interview Lab</h1>
	</a>
);

const navItems = [
	{ href: '/session', icon: 'IconPlay', label: '인터뷰 모드' },
	{ href: '/mypage', icon: 'IconMe', label: '마이페이지' },
	{ href: '/setting', icon: 'IconSetting', label: '세팅' },
] satisfies NavItem[];

export const Default: Story = {
	args: {
		logo: Logo,
		items: navItems,
		activeHref: '/mypage',
	},
};
