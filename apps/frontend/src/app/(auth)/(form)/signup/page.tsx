'use client';
import { AUTH } from '@interview-lab/shared';
import { Atom, Molecule } from '@interview-lab/ui';
import clsx from 'clsx';
import { type FormEvent, type MouseEvent, useState } from 'react';
import useSignupForm from '@/hooks/useSignupForm';
import useTimer from '@/hooks/useTimer';
import { buttonStyle, formStyle } from '../login/page.css';
import {
	emailFieldContainerStyle,
	sendVerificationCodeButton,
	timerStyle,
} from './signup.css';

const DEFAULT_PENDING_TIME = 60;

export default function SignupPage() {
	const [state, dispatch] = useSignupForm();
	const [time, updateTime] = useTimer(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/register/email`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				email: state.email.value,
				password: state.password.value,
				username: state.username.value,
				verificationCode: state.verificationCode.value,
			}),
		});
		setIsLoading(false);
	};

	const handleSendVerificationCode = async (
		e: MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		updateTime(DEFAULT_PENDING_TIME);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER}/auth/email/send-verification`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					email: state.email.value,
				}),
			},
		);
		const { remainingTime } = await response.json();
		if (remainingTime) {
			updateTime(remainingTime);
		}
		setIsLoading(false);
	};

	const isFormValid = Object.values(state).every(
		(field) => !field.isError && field.touched,
	);

	const sendVerificationCodeText =
		time > 0 ? `${time} S` : isLoading ? '전송 중' : '인증번호 전송';

	return (
		<form className={formStyle} onSubmit={handleSubmit}>
			<Molecule.InputWithValidation
				leftIcon={<Atom.Icon icon="IconMe" />}
				label="Username"
				id="username"
				placeholder="john"
				value={state.username.value}
				isError={state.username.isError}
				errorMessage={state.username.errorMessage}
				onChange={(e) =>
					dispatch({ type: 'change', field: 'username', value: e.target.value })
				}
				onBlur={() => dispatch({ type: 'blur', field: 'username' })}
			/>
			<div className={emailFieldContainerStyle}>
				<Molecule.InputWithValidation
					leftIcon={<Atom.Icon icon="IconMail" />}
					label="Email"
					id="email"
					placeholder="dev@example.com"
					value={state.email.value}
					isError={state.email.isError}
					errorMessage={state.email.errorMessage}
					onChange={(e) =>
						dispatch({ type: 'change', field: 'email', value: e.target.value })
					}
					onBlur={() => dispatch({ type: 'blur', field: 'email' })}
				/>
				<Atom.TextButton
					type="button"
					className={clsx(
						sendVerificationCodeButton,
						(time || isLoading) && timerStyle,
					)}
					onClick={handleSendVerificationCode}
					disabled={state.email.isError || time > 0 || isLoading}
				>
					{sendVerificationCodeText}
				</Atom.TextButton>
			</div>
			<Molecule.InputWithValidation
				leftIcon={<Atom.Icon icon="IconKey" />}
				label="Verification Code"
				id="verificationCode"
				placeholder="000000"
				type="text"
				inputMode="numeric"
				pattern={`[0-9]{${AUTH.CONST.VERIFICATION_CODE_LENGTH}}`}
				maxLength={AUTH.CONST.VERIFICATION_CODE_LENGTH}
				minLength={AUTH.CONST.VERIFICATION_CODE_LENGTH}
				value={state.verificationCode.value}
				isError={state.verificationCode.isError}
				errorMessage={state.verificationCode.errorMessage}
				onChange={(e) =>
					dispatch({
						type: 'change',
						field: 'verificationCode',
						value: e.target.value,
					})
				}
				onBlur={() => dispatch({ type: 'blur', field: 'verificationCode' })}
			/>
			<Molecule.InputPassword
				leftIcon={<Atom.Icon icon="IconLock" />}
				label="Password"
				id="password"
				placeholder="••••••••"
				value={state.password.value}
				isError={state.password.isError}
				errorMessage={state.password.errorMessage}
				onChange={(e) =>
					dispatch({ type: 'change', field: 'password', value: e.target.value })
				}
				onBlur={() => dispatch({ type: 'blur', field: 'password' })}
			/>
			<Molecule.InputPassword
				leftIcon={<Atom.Icon icon="IconLock" />}
				label="Confirm Password"
				id="confirmPassword"
				placeholder="••••••••"
				value={state.confirmPassword.value}
				isError={state.confirmPassword.isError}
				errorMessage={state.confirmPassword.errorMessage}
				onChange={(e) =>
					dispatch({
						type: 'change',
						field: 'confirmPassword',
						value: e.target.value,
					})
				}
				onBlur={() => dispatch({ type: 'blur', field: 'confirmPassword' })}
			/>
			<Atom.TextButton
				className={buttonStyle}
				type="submit"
				disabled={!isFormValid || isLoading}
			>
				Sign up
			</Atom.TextButton>
		</form>
	);
}
