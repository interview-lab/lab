import { mergeClassnames } from '@interview-lab/shared';
import type { ElementType, ReactNode } from 'react';
import type { Text } from '@/types/text';
import { ButtonStyleVarient } from './button.css';

type ButtonTextType = Text;

type ButtonProps<T extends ButtonTextType> = {
	textType: T;
	children: ReactNode;
	className?: string;
	style: keyof typeof ButtonStyleVarient;
};

const Button = <T extends ButtonTextType>({
	textType,
	children,
	className,
	style = 'primary',
}: ButtonProps<T>) => {
	const TextTag = textType as ElementType;

	return (
		<TextTag className={mergeClassnames(ButtonStyleVarient[style], className)}>
			{children}
		</TextTag>
	);
};

export default Button;
