import { mergeClassnames } from '@interview-lab/shared';
import Icon from '../../atoms/Icon';
import type { InputProps } from '../../atoms/Input';
import Input from '../../atoms/Input';
import {
	errorMessageStyle,
	errorStyle,
	iconStyle,
	inputStyle,
} from './inputWithValidation.css';

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
	const mergedClassnames = mergeClassnames(
		props.isError ? errorStyle : '',
		props.className,
	);

	return (
		<div>
			<div className={inputStyle}>
				<Input className={mergedClassnames} {...props} />
				{props.isError && (
					<Icon icon="IconExclamationCircle" className={iconStyle} />
				)}
			</div>
			{props.isError && props.errorMessage && (
				<p className={errorMessageStyle}>{props.errorMessage}</p>
			)}
		</div>
	);
};

export default InputWithValidation;
