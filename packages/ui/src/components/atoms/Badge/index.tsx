import type { HTMLAttributes, ReactNode } from 'react';
import { badgeStyle } from './badge.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode };

const Badge = ({ children }: BadgeProps) => {
	return <span className={badgeStyle}>{children}</span>;
};

export default Badge;
