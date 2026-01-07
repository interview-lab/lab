import { mergeClassnames } from '@interview-lab/shared';
import type { InputHTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import { containerStyle, iconStyle, inputStyle } from './input.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	icon?: Parameters<typeof Icon>[0]['icon'];
};

const Input = ({ className, icon, ...props }: InputProps) => {
	return (
		<div className={containerStyle}>
			{icon && <Icon icon={icon} className={iconStyle} />}
			<input className={mergeClassnames(inputStyle, className)} {...props} />
		</div>
	);
};

export default Input;
