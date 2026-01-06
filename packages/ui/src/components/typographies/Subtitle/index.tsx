import { mergeClassnames } from '@interview-lab/shared';
import type { ElementType, ReactNode } from 'react';
import type { Text } from '@/types/text';
import { SubtitleStyleVarient } from './subtitle.css';

type SubtitleTextType = Text;

type SubtitleProps<T extends SubtitleTextType> = {
	textType: T;
	children: ReactNode;
	className?: string;
	style: keyof typeof SubtitleStyleVarient;
};

const Subtitle = <T extends SubtitleTextType>({
	textType,
	children,
	className,
	style = 'primary',
}: SubtitleProps<T>) => {
	const TextTag = textType as ElementType;

	return (
		<TextTag
			className={mergeClassnames(SubtitleStyleVarient[style], className)}
		>
			{children}
		</TextTag>
	);
};

export default Subtitle;
