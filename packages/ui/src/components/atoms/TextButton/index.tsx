import { mergeClassnames } from '@interview-lab/shared';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Icon from '@/components/atoms/Icon';
import { buttonStyle } from './textButton.css';

export type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	icon?: Parameters<typeof Icon>[0]['icon'];
	showIcon?: boolean;
};

const TextButton = ({
	className,
	children,
	icon,
	showIcon = true,
	...props
}: TextButtonProps) => {
	return (
		<button className={mergeClassnames(buttonStyle, className)} {...props}>
			{showIcon && icon && <Icon icon={icon} />}
			{children}
		</button>
	);
};

export default TextButton;
