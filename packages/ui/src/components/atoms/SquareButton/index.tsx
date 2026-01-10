import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import {
	activeButtonStyle,
	activeIconStyle,
	buttonStyle,
	iconStyle,
} from './squareButton.css';

export type SquareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: Parameters<typeof Icon>[0]['icon'];
	active?: boolean;
};

const SquareButton = ({
	className,
	icon,
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
				/>
			)}
		</button>
	);
};

export default SquareButton;
