import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import {
	buttonStyle,
	iconStyle,
} from '@/components/atoms/CircleButton/circleButton.css';
import Icon from '@/components/atoms/Icon';

export type CircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: Parameters<typeof Icon>[0]['icon'];
};

const CircleButton = ({ className, icon, ...props }: CircleButtonProps) => {
	return (
		<button className={clsx(buttonStyle, className)} {...props}>
			{icon && <Icon icon={icon} className={iconStyle} />}
		</button>
	);
};

export default CircleButton;
