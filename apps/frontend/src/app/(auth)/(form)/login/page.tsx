'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import useLoginForm from '@/hooks/useLoginForm';
import { buttonStyle, formStyle } from './page.css';

export default function LoginPage() {
	const router = useRouter();
	const [state, dispatch] = useLoginForm();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_SERVER}/auth/login/email`,
			{
				headers: {
					'Content-Type': 'application/json',
					credentials: 'include',
				},
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					email: state.email.value,
					password: state.password.value,
				}),
			},
		);

		if (response.ok) {
			router.push('/');
		}
		setIsLoading(false);
	};

	const isFormValid = Object.values(state).every(
		(field) => !field.isError && field.touched,
	);

	return (
		<form className={formStyle} onSubmit={handleSubmit}>
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
			<Atom.TextButton
				className={buttonStyle}
				type="submit"
				disabled={!isFormValid}
			>
				Sign in
			</Atom.TextButton>
		</form>
	);
}
