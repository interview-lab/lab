import clsx from 'clsx';
import type { ReactElement } from 'react';
import Icon, { type IconName } from '../../atoms/Icon';
import {
	logoStyle,
	logoTitleStyle,
	navItemActiveStyle,
	navItemStyle,
	navStyle,
	sidebarStyle,
} from './SideNavbar.css';

export { logoStyle, logoTitleStyle };

export type NavItem = {
	href: string;
	icon: IconName;
	label: string;
};

type SideNavbarProps = {
	logo?: ReactElement;
	items?: NavItem[];
	activeHref?: string;
	renderLink?: (props: {
		href: string;
		className: string;
		children: React.ReactNode;
	}) => React.ReactNode;
	className?: string;
};

/**
 * 사이드 네비게이션 컴포넌트
 *
 * @param props - 컴포넌트 props
 * @param props.logo - 로고 요소 (Link로 감싼 아이콘+타이틀)
 * @param props.items - 네비게이션 메뉴 데이터
 * @param props.activeHref - 현재 활성화된 경로
 * @param props.renderLink - 커스텀 Link 렌더링 함수
 * @param props.className - 추가 CSS 클래스
 */
const SideNavbar = ({
	logo,
	items,
	activeHref,
	renderLink,
	className,
}: SideNavbarProps) => {
	const isActive = (href: string) => {
		if (!activeHref) return false;
		return activeHref.startsWith(href);
	};

	const renderNavItem = (item: NavItem) => {
		const itemClassName = clsx(
			navItemStyle,
			isActive(item.href) && navItemActiveStyle,
		);

		const content = (
			<>
				<Icon icon={item.icon} width={20} height={20} />
				{item.label}
			</>
		);

		if (renderLink) {
			return renderLink({
				href: item.href,
				className: itemClassName,
				children: content,
			});
		}

		return (
			<a href={item.href} className={itemClassName}>
				{content}
			</a>
		);
	};

	return (
		<aside className={clsx(sidebarStyle, className)}>
			{logo}
			<nav>
				<ul className={navStyle}>
					{items?.map((item) => (
						<li key={item.href}>{renderNavItem(item)}</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default SideNavbar;
