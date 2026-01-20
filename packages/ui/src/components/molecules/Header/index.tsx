import { mergeClassnames } from '@interview-lab/shared';
import type { ReactElement } from 'react';
import defaultUserImage from '@/assets/image/default-user-image.jpeg';
import { Icon } from '@/components/atoms';
import type { IconName } from '@/components/atoms/Icon';
import {
	containerStyle,
	logoStyle,
	navLinkStyle,
	navStyle,
	titleStyle,
	userProfileButtonStyle,
	userProfileImageStyle,
} from '@/components/molecules/Header/header.css';

export { navLinkStyle };

export type HeaderProps = {
	title?: string;
	logoIcon?: IconName;
	navItems?: ReactElement[];
	userImage?: string;
	onUserProfileClick?: () => void;
	className?: string;
};

/**
 * 애플리케이션 상단 네비게이션 헤더 컴포넌트
 *
 * @param props - 컴포넌트 props
 * @param props.title - 로고 옆에 표시될 타이틀 (기본값: 'DevInterview')
 * @param props.logoIcon - 로고 아이콘 (기본값: 'IconTerminal')
 * @param props.navItems - 네비게이션 메뉴 요소들
 * @param props.userImage - 사용자 프로필 이미지 URL
 * @param props.onUserProfileClick - 프로필 이미지 클릭 핸들러
 * @param props.className - 추가 CSS 클래스
 */
const Header = ({
	title = 'DevInterview',
	logoIcon = 'IconTerminal',
	navItems,
	userImage = defaultUserImage,
	onUserProfileClick,
	className,
}: HeaderProps) => {
	return (
		<div className={mergeClassnames(containerStyle, className)}>
			<div className={logoStyle}>
				<Icon icon={logoIcon} width={24} height={24} />
				<h1 className={titleStyle}>{title}</h1>
			</div>
			<nav className={navStyle}>
				{navItems?.map((item) => (
					<li key={item.key}>{item}</li>
				))}
				<li>
					<button
						type="button"
						className={userProfileButtonStyle}
						onClick={onUserProfileClick}
					>
						<img
							src={userImage}
							alt="User profile"
							className={userProfileImageStyle}
						/>
					</button>
				</li>
			</nav>
		</div>
	);
};

export default Header;
