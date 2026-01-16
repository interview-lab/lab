import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import {
	DASHBOARD_CARD_CONFIG,
	type DashboardCardKey,
} from '@/components/molecules/DashboardCard/dashboardCard.config';
import {
	containerStyle,
	headerStyle,
	iconColorStyle,
	iconVariantStyle,
	titleStyle,
	valueStyle,
} from '@/components/molecules/DashboardCard/dashboardCard.css';

type DashboardCardProps = HTMLAttributes<HTMLDivElement> & {
	cardKey: DashboardCardKey;
	value: number;
};

const DashboardCard = ({
	cardKey,
	value,
	className,
	...props
}: DashboardCardProps) => {
	const { title, iconKey, variant, formatter } = DASHBOARD_CARD_CONFIG[cardKey];

	return (
		<div className={clsx(containerStyle, className)} {...props}>
			<div className={headerStyle}>
				<div className={iconVariantStyle[variant]}>
					<Icon
						icon={iconKey}
						width={28}
						height={28}
						className={iconColorStyle[variant]}
					/>
				</div>
				<p className={titleStyle}>{title}</p>
			</div>
			<h2 className={valueStyle}>{formatter(value)}</h2>
		</div>
	);
};

export default DashboardCard;
