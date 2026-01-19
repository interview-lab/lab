'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { useAdditionalForm } from '@/hooks/useAdditionalInfoForm';
import { buttonStyle, formStyle } from '../login/page.css';
import {
	emailFieldContainerStyle,
	sendVerificationCodeButton,
} from './additional-info.css';

export default function AdditionalInfoPage() {
	const [state, dispatch] = useAdditionalForm();

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
				varificationCode: state.verificationCode.value,
			}),
		});
	};

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
				<Atom.TextButton type="button" className={sendVerificationCodeButton}>
					인증번호 전송
				</Atom.TextButton>
			</div>
			<Molecule.InputWithValidation
				leftIcon={<Atom.Icon icon="IconKey" />}
				label="Varification Code"
				id="varificationCode"
				placeholder="000000"
				type="number"
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
