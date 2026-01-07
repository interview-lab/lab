import { mergeClassnames } from '@interview-lab/shared';
import type { InputHTMLAttributes } from 'react';
import Icon from '@/components/atoms/Icon';
import {
	iconStyle,
	inputContainerStyle,
	inputStyle,
	labelStyle,
} from './input.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	icon?: Parameters<typeof Icon>[0]['icon'];
} & (
		| {
				label: string;
				id: string;
		  }
		| {
				label?: never;
				id?: string;
		  }
	);

const Input = ({ className, icon, label, ...props }: InputProps) => {
	return (
		<div>
			{label && (
				<label htmlFor={props.id} className={labelStyle}>
					{label}
				</label>
			)}
			<div className={inputContainerStyle}>
				{icon && <Icon icon={icon} className={iconStyle} />}
				<input className={mergeClassnames(inputStyle, className)} {...props} />
			</div>
		</div>
	);
};

export default Input;
