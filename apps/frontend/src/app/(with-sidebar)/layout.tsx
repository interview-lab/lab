'use client';

import {
	Atom,
	Molecule,
	type NavItem,
	sideNavbarLogoStyle,
	sideNavbarLogoTitleStyle,
} from '@interview-lab/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { layoutStyle, mainStyle } from './layout.css';

const navItems: NavItem[] = [
	{ href: '/session', icon: 'IconPlay', label: '인터뷰 모드' },
	{ href: '/mypage', icon: 'IconMe', label: '마이페이지' },
	{ href: '/setting', icon: 'IconSetting', label: '세팅' },
];

export default function WithSidebarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	return (
		<div className={layoutStyle}>
			<Molecule.SideNavbar
				logo={
					<Link href="/" className={sideNavbarLogoStyle}>
						<Atom.SquareButton icon="IconCode" active />
						<h1 className={sideNavbarLogoTitleStyle}>Interview Lab</h1>
					</Link>
				}
				items={navItems}
				activeHref={pathname}
				renderLink={({ href, className, children }) => (
					<Link href={href} className={className}>
						{children}
					</Link>
				)}
			/>
			<main className={mainStyle}>{children}</main>
		</div>
	);
}
