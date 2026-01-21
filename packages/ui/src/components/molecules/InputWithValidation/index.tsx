import clsx from 'clsx';
import Icon from '@/components/atoms/Icon';
import type { InputProps } from '@/components/atoms/Input';
import Input from '@/components/atoms/Input';
import {
	containerStyle,
	errorMessageStyle,
	errorStyle,
	inputStyle,
} from './inputWithValidation.css';

type InputDefaultState = {
	isError?: false;
};

type InputErrorState = {
	isError: true;
	errorMessage?: string;
};

type InputWithValidationProps = InputProps &
	(InputDefaultState | InputErrorState);

const InputWithValidation = (props: InputWithValidationProps) => {
	return (
		<div className={containerStyle}>
			<div className={clsx(inputStyle, props.isError && errorStyle)}>
				<Input
					className={clsx(props.className, props.isError && errorStyle)}
					rightIcon={
						props.isError ? <Icon icon="IconExclamationCircle" /> : undefined
					}
					{...props}
				/>
			</div>
			{props.isError && props.errorMessage && (
				<p className={errorMessageStyle}>{props.errorMessage}</p>
			)}
		</div>
	);
};

export default InputWithValidation;
