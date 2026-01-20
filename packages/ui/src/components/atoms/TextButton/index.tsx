import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Icon from '@/components/atoms/Icon';
import { buttonStyle } from '@/components/atoms/TextButton/textButton.css';

export type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	icon?: Parameters<typeof Icon>[0]['icon'];
	iconSize?: number;
	showIcon?: boolean;
};

const TextButton = ({
	className,
	children,
	icon,
	iconSize,
	showIcon = true,
	...props
}: TextButtonProps) => {
	return (
		<button className={clsx(buttonStyle, className)} {...props}>
			{showIcon && icon && (
				<Icon icon={icon} width={iconSize} height={iconSize} />
			)}
			{children}
		</button>
	);
};

export default TextButton;
