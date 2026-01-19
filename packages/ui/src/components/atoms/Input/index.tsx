import clsx from 'clsx';
import type { InputHTMLAttributes, ReactElement } from 'react';
import {
	containerStyle,
	inputContainerStyle,
	inputStyle,
	labelStyle,
	leftIconStyle,
	rightIconStyle,
} from './input.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
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

const Input = ({
	className,
	label,
	leftIcon,
	rightIcon,
	...props
}: InputProps) => {
	return (
		<div className={containerStyle}>
			{label && (
				<label htmlFor={props.id} className={labelStyle}>
					{label}
				</label>
			)}
			<div className={inputContainerStyle}>
				{leftIcon && <span className={leftIconStyle}>{leftIcon}</span>}
				<input className={clsx(inputStyle, className)} {...props} />
				{rightIcon && <span className={rightIconStyle}>{rightIcon}</span>}
			</div>
		</div>
	);
};

export default Input;
