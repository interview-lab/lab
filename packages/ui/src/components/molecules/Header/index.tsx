import defaultUserImage from '@/assets/image/default-user-image.jpeg';
import { Icon, TextButton } from '@/components/atoms';
import type { IconName } from '@/components/atoms/Icon';
import {
	containerStyle,
	logoStyle,
	navButtonStyle,
	navStyle,
	titleStyle,
	userProfileButtonStyle,
	userProfileImageStyle,
} from '@/components/molecules/Header/header.css';
import { mergeClassnames } from '@interview-lab/shared';

type NavItem = {
	label: string;
	icon: IconName;
	onClick?: () => void;
};

type HeaderProps = {
	title?: string;
	logoIcon?: IconName;
	navItems?: NavItem[];
	userImage?: string;
	onUserProfileClick?: () => void;
	className?: string;
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
	{ label: 'Dashboard', icon: 'IconHome' },
	{ label: 'Practice', icon: 'IconCode' },
	{ label: 'History', icon: 'IconReplay' },
	{ label: 'Setting', icon: 'IconSetting' },
];

const Header = ({
	title = 'DevInterview',
	logoIcon = 'IconTerminal',
	navItems = DEFAULT_NAV_ITEMS,
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
				{navItems.map((item) => (
					<li key={item.label}>
						<TextButton
							icon={item.icon}
							iconSize={24}
							className={navButtonStyle}
							onClick={item.onClick}
						>
							{item.label}
						</TextButton>
					</li>
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
