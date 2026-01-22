import type { Meta, StoryObj } from '@storybook/react-vite';
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
	{ href: '/session', icon: 'IconPlay' as const, label: '인터뷰 모드' },
	{ href: '/mypage', icon: 'IconMe' as const, label: '마이페이지' },
	{ href: '/setting', icon: 'IconSetting' as const, label: '세팅' },
];

export const Default: Story = {
	args: {
		logo: Logo,
		items: navItems,
		activeHref: '/mypage',
	},
};
