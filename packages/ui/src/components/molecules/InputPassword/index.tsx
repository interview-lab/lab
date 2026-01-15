import clsx from 'clsx';
import { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import type { InputProps } from '@/components/atoms/Input';
import Input from '@/components/atoms/Input';
import { errorMessageStyle, errorStyle, inputStyle } from './inputPassword.css';

type InputDefaultState = {
	isError: false;
};

type InputErrorState = {
	isError: true;
	errorMessage?: string;
};

type InputWithValidationProps = InputProps &
	(InputDefaultState | InputErrorState);

const InputWithValidation = (props: InputWithValidationProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleTogglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		<div>
			<div className={clsx(inputStyle, props.isError && errorStyle)}>
				<Input
					{...props}
					className={clsx(props.className, props.isError && errorStyle)}
					leftIcon={<Icon icon="IconLock" />}
					rightIcon={
						<button type="button" onClick={handleTogglePasswordVisibility}>
							<Icon
								icon={isPasswordVisible ? 'IconVisible' : 'IconInvisible'}
							/>
						</button>
					}
					type={isPasswordVisible ? 'text' : 'password'}
				/>
			</div>
			{props.isError && props.errorMessage && (
				<p className={errorMessageStyle}>{props.errorMessage}</p>
			)}
		</div>
	);
};

export default InputWithValidation;
