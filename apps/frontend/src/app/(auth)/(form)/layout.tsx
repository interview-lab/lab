'use client';
import { Atom, Molecule, Typography } from '@interview-lab/ui';
import Link from 'next/link';
import { useState } from 'react';
import {
	dividerStyle,
	signUpLinkStyle,
	socialButtonContainerStyle,
} from './layout.css';

const ToggleOptions = [
	{ value: 'login', label: 'Login' },
	{ value: 'signup', label: 'Sign Up' },
] as const;

type ToggleValue = (typeof ToggleOptions)[number]['value'];

export default function FormLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [selectedValue, setSelectedValue] = useState<ToggleValue>(
		ToggleOptions[0].value,
	);

	return (
		<>
			<Molecule.Toggle
				items={ToggleOptions}
				selectedValue={selectedValue}
				onSelect={(value) => setSelectedValue(value)}
			/>
			{children}
			<Typography.Base textType="p" style="secondary" className={dividerStyle}>
				Or continue with
			</Typography.Base>
			<div className={socialButtonContainerStyle}>
				<Atom.TextButton icon="IconGithub">Github</Atom.TextButton>
				<Atom.TextButton icon="IconGoogle">Google</Atom.TextButton>
			</div>
			<Typography.Base
				textType="p"
				style="secondary"
				className={signUpLinkStyle}
			>
				Don't have an account?{' '}
				<strong>
					<Link href="/signup">Sign Up for free</Link>
				</strong>
			</Typography.Base>
		</>
	);
}
