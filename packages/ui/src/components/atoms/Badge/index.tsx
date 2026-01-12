import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';
import { badgeStyle } from './badge.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode };

const Badge = ({ children, className, ...props }: BadgeProps) => {
	return (
		<span className={clsx(badgeStyle, className)} {...props}>
			{children}
		</span>
	);
};

export default Badge;
