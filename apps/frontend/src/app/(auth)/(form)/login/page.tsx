'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { buttonStyle, formStyle } from './page.css';

export default function LoginPage() {
	return (
		<form className={formStyle}>
			<Molecule.InputWithValidation
				leftIcon={<Atom.Icon icon="IconMail" />}
				label="Email"
				id="email"
				placeholder="dev@example.com"
			/>
			<Molecule.InputPassword
				leftIcon={<Atom.Icon icon="IconLock" />}
				label="Password"
				id="password"
				placeholder="••••••••"
			/>
			<Atom.TextButton className={buttonStyle} type="submit">
				Sign in
			</Atom.TextButton>
		</form>
	);
}
