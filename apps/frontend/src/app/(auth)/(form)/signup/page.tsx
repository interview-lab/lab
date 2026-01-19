'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { buttonStyle, formStyle } from '../login/page.css';
import { useSignupForm } from './useSignupForm';

export default function SignupPage() {
	const [state, dispatch] = useSignupForm();

	return (
		<form className={formStyle}>
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
			<Atom.TextButton className={buttonStyle} type="submit">
				Sign up
			</Atom.TextButton>
		</form>
	);
}
