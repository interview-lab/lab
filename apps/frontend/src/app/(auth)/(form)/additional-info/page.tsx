'use client';
import { AUTH } from '@interview-lab/shared';
import { Atom, Molecule } from '@interview-lab/ui';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { type MouseEvent, useEffect } from 'react';
import useAdditionalInfoForm from '@/hooks/useAdditionalInfoForm';
import useTimer from '@/hooks/useTimer';
import { buttonStyle, formStyle } from '../login/page.css';
import {
	emailFieldContainerStyle,
	sendVerificationCodeButton,
	timerStyle,
} from './additional-info.css';

const DEFAULT_PENDING_TIME = 60;

export default function AdditionalInfoPage() {
	const searchParams = useSearchParams();
	const [state, dispatch] = useAdditionalInfoForm();
	const [time, updateTime] = useTimer(0);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/register/email`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				email: state.email.value,
				username: state.username.value,
				verificationCode: state.verificationCode.value,
			}),
		});
	};

	const handleSendVerificationCode = async (
		e: MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		updateTime(DEFAULT_PENDING_TIME);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER}/auth/email/send-verification`,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-temp-token': searchParams.get('tempToken') ?? '',
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
	};

	useEffect(() => {
		dispatch({
			type: 'change',
			field: 'email',
			value: searchParams.get('email') || '',
		});
		dispatch({
			type: 'change',
			field: 'username',
			value: searchParams.get('name') || '',
		});
	}, [searchParams, dispatch]);

	const isFormValid = Object.values(state).every(
		(field) => !field.isError && field.touched,
	);

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
					className={clsx(sendVerificationCodeButton, time && timerStyle)}
					onClick={handleSendVerificationCode}
					disabled={state.email.isError || time > 0}
				>
					{time > 0 ? `${time} S` : '인증번호 전송'}
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
			<Atom.TextButton
				className={buttonStyle}
				type="submit"
				disabled={!isFormValid}
			>
				Sign up
			</Atom.TextButton>
		</form>
	);
}
