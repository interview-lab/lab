import defaultUserImage from '@/assets/image/default-user-image.jpeg';
import { Icon, TextButton } from '@/components/atoms';
import {
	containerStyle,
	logoStyle,
	navButtonStyle,
	navStyle,
	titleStyle,
	userProfileButtonStyle,
	userProfileImageStyle,
} from '@/components/molecules/Header/header.css';

const Header = () => {
	return (
		<div className={containerStyle}>
			<div className={logoStyle}>
				<Icon icon="IconTerminal" width={24} height={24} />
				<h1 className={titleStyle}>DevInterview</h1>
			</div>
			<nav className={navStyle}>
				<li>
					<TextButton icon="IconHome" iconSize={24} className={navButtonStyle}>
						Dashboard
					</TextButton>
				</li>
				<li>
					<TextButton icon="IconCode" iconSize={24} className={navButtonStyle}>
						Practice
					</TextButton>
				</li>
				<li>
					<TextButton
						icon="IconReplay"
						iconSize={24}
						className={navButtonStyle}
					>
						History
					</TextButton>
				</li>
				<li>
					<TextButton
						icon="IconSetting"
						iconSize={24}
						className={navButtonStyle}
					>
						Setting
					</TextButton>
				</li>
				<li>
					<button type="button" className={userProfileButtonStyle}>
						<img
							src={defaultUserImage}
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
