import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import {
	activeButtonStyle,
	activeIconStyle,
	buttonStyle,
	iconStyle,
} from '@/components/atoms/SquareButton/squareButton.css';

export type SquareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: Parameters<typeof Icon>[0]['icon'];
	iconColor?: string;
	active?: boolean;
};

const SquareButton = ({
	className,
	icon,
	iconColor,
	active,
	...props
}: SquareButtonProps) => {
	return (
		<button
			className={clsx(
				buttonStyle,
				active ? activeButtonStyle : undefined,
				className,
			)}
			{...props}
		>
			{icon && (
				<Icon
					icon={icon}
					className={clsx(iconStyle, active ? activeIconStyle : undefined)}
					style={!active && iconColor ? { color: iconColor } : undefined}
				/>
			)}
		</button>
	);
};

export default SquareButton;
