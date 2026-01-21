import clsx from 'clsx';
import type { ReactElement } from 'react';
import {
	containerStyle,
	logoStyle,
	navLinkStyle,
	navStyle,
	titleStyle,
	userProfileButtonStyle,
	userProfileImageStyle,
} from '@/components/molecules/Header/header.css';

export {
	navLinkStyle,
	logoStyle,
	titleStyle,
	userProfileButtonStyle,
	userProfileImageStyle,
};

type HeaderProps = {
	logo?: ReactElement;
	navItems?: ReactElement[];
	className?: string;
};

/**
 * 애플리케이션 상단 네비게이션 헤더 컴포넌트
 *
 * @param props - 컴포넌트 props
 * @param props.logo - 로고 요소 (Link로 감싼 아이콘+타이틀)
 * @param props.navItems - 네비게이션 메뉴 요소들 (로그인 버튼, 프로필 등 포함)
 * @param props.className - 추가 CSS 클래스
 */
const Header = ({ logo, navItems, className }: HeaderProps) => {
	return (
		<div className={clsx(containerStyle, className)}>
			{logo}
			<nav className={navStyle}>
				{navItems?.map((item) => (
					<li key={item.key}>{item}</li>
				))}
			</nav>
		</div>
	);
};

export default Header;
