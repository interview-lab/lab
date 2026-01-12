import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import type { Text } from '@/types/text';
import { BaseStyleVarient } from './base.css';

type BaseTextType = Text;

type BaseProps<T extends BaseTextType> = {
	textType: T;
	children: ReactNode;
	className?: string;
	style: keyof typeof BaseStyleVarient;
};

const Base = <T extends BaseTextType>({
	textType,
	children,
	className,
	style = 'primary',
}: BaseProps<T>) => {
	const TextTag = textType as ElementType;

	return (
		<TextTag className={clsx(BaseStyleVarient[style], className)}>
			{children}
		</TextTag>
	);
};

export default Base;
