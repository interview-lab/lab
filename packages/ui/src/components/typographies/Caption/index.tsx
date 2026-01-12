import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import type { Text } from '@/types/text';
import { CaptionStyleVarient } from './caption.css';

type CaptionTextType = Text;

type CaptionProps<T extends CaptionTextType> = {
	textType: T;
	children: ReactNode;
	className?: string;
	style: keyof typeof CaptionStyleVarient;
};

const Caption = <T extends CaptionTextType>({
	textType,
	children,
	className,
	style = 'primary',
}: CaptionProps<T>) => {
	const TextTag = textType as ElementType;

	return (
		<TextTag className={clsx(CaptionStyleVarient[style], className)}>
			{children}
		</TextTag>
	);
};

export default Caption;
