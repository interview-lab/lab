import { mergeClassnames } from '@interview-lab/shared';
import type { ButtonHTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import { buttonStyle, iconStyle } from './circleButton.css';

export type CircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: Parameters<typeof Icon>[0]['icon'];
};

const CircleButton = ({ className, icon, ...props }: CircleButtonProps) => {
	return (
		<button className={mergeClassnames(buttonStyle, className)} {...props}>
			{icon && <Icon icon={icon} className={iconStyle} />}
		</button>
	);
};

export default CircleButton;
