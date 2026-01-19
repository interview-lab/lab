import Icon from '@/components/atoms/Icon';
import {
	captionStyle,
	containerStyle,
	contentStyle,
	headerStyle,
	iconContainerStyle,
	iconStyle,
} from '@/components/molecules/MypageCard/mypageCard.css';
import {
	CARD_CONFIG,
	type CardType,
} from '@/components/molecules/MypageCard/mypageCardOptions';

type MypageCardProps = {
	type: CardType;
	value: number;
};

const MypageCard = ({ type, value }: MypageCardProps) => {
	const config = CARD_CONFIG[type];

	return (
		<div className={containerStyle}>
			<div className={headerStyle}>
				<h1 className={contentStyle}>{config.format(value)}</h1>
				<div
					className={iconContainerStyle}
					style={{ backgroundColor: config.bgColor }}
				>
					<Icon
						icon={config.icon}
						className={iconStyle}
						style={{ color: config.color }}
					/>
				</div>
			</div>
			<span className={captionStyle}>{config.caption}</span>
		</div>
	);
};

export default MypageCard;
