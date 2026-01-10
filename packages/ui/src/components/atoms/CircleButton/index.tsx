import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import { buttonStyle, iconStyle } from './circleButton.css';

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
