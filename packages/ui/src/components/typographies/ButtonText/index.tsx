import { mergeClassnames } from '@interview-lab/shared';
import type { ElementType, ReactNode } from 'react';
import type { Text } from '@/types/text';
import { ButtonStyleVariant } from './button.css';

type ButtonTextType = Text;

type ButtonProps<T extends ButtonTextType> = {
	textType: T;
	children: ReactNode;
	className?: string;
	style: keyof typeof ButtonStyleVariant;
};

const ButtonText = <T extends ButtonTextType>({
	textType,
	children,
	className,
	style = 'primary',
}: ButtonProps<T>) => {
	const TextTag = textType as ElementType;

	return (
		<TextTag className={mergeClassnames(ButtonStyleVariant[style], className)}>
			{children}
		</TextTag>
	);
};

export default ButtonText;
