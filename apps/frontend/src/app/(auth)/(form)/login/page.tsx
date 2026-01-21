'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import client from '@/configs/fetch';
import useAsync from '@/hooks/useAsync';
import useLoginForm from '@/hooks/useLoginForm';
import { buttonStyle, formStyle } from './page.css';

export default function LoginPage() {
	const router = useRouter();
	const [state, dispatch] = useLoginForm();
	const { isLoading, error, execute } = useAsync();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await execute(async () => {
			const { error } = await client.POST('/auth/login/email', {
				body: {
					email: state.email.value,
					password: state.password.value,
				},
			});

			if (error) throw new Error('에러 발생');

			router.push('/');
		});
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
				disabled={!isFormValid || isLoading}
			>
				Sign in
			</Atom.TextButton>
		</form>
	);
}
