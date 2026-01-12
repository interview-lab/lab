import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import type { Text } from '@/types/text';
import { TitleStyleVarient } from './title.css';

type TitleTextType = Extract<Text, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

type TitleProps<T extends TitleTextType> = {
	textType: T;
	children: ReactNode;
	className?: string;
	style: keyof typeof TitleStyleVarient;
};

const Title = <T extends TitleTextType>({
	textType,
	children,
	className,
	style = 'primary',
}: TitleProps<T>) => {
	const TextTag = textType as ElementType;

	return (
		<TextTag className={clsx(TitleStyleVarient[style], className)}>
			{children}
		</TextTag>
	);
};

export default Title;
