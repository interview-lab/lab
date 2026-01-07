import { mergeClassnames } from '@interview-lab/shared';
import type { HTMLAttributes, ReactNode } from 'react';
import { badgeStyle } from './badge.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode };

const Badge = ({ children, className, ...props }: BadgeProps) => {
	return (
		<span className={mergeClassnames(badgeStyle, className)} {...props}>
			{children}
		</span>
	);
};

export default Badge;
