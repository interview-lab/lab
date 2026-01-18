'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { buttonStyle, formStyle } from '../login/page.css';

export default function SignupPage() {
	return (
		<form className={formStyle}>
			<Molecule.InputWithValidation
				leftIcon={<Atom.Icon icon="IconMe" />}
				label="Username"
				id="username"
				placeholder="john"
			/>
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
			<Molecule.InputPassword
				leftIcon={<Atom.Icon icon="IconLock" />}
				label="Confirm Password"
				id="confirmPassword"
				placeholder="••••••••"
			/>
			<Atom.TextButton className={buttonStyle} type="submit">
				Sign up
			</Atom.TextButton>
		</form>
	);
}
