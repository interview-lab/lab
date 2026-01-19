'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { buttonStyle, formStyle } from './page.css';
import { useLoginForm } from './useLoginForm';

export default function LoginPage() {
	const [state, dispatch] = useLoginForm();

	return (
		<form className={formStyle}>
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
			<Atom.TextButton className={buttonStyle} type="submit">
				Sign in
			</Atom.TextButton>
		</form>
	);
}
