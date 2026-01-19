'use client';
import { Atom, Molecule, Typography } from '@interview-lab/ui';
import { usePathname, useRouter } from 'next/navigation';
import { dividerStyle, socialButtonContainerStyle } from './layout.css';

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
	const router = useRouter();
	const mode = usePathname().split('/').pop();

	const handleModeChange = (value: ToggleValue) => {
		router.replace(`/${value}`);
	};

	return (
		<>
			<Typography.Title textType="h2" style="primary">
				{mode === 'login' ? 'Welcome back' : 'Create an account'}
			</Typography.Title>
			<Typography.Base textType="p" style="secondary">
				{mode === 'login'
					? 'Access real interview questions and practice tools.'
					: 'Enter your details to access your interview dashboard.'}
			</Typography.Base>
			<Molecule.Toggle
				items={ToggleOptions}
				selectedValue={mode as ToggleValue}
				onSelect={handleModeChange}
			/>
			{children}
			<Typography.Base textType="p" style="secondary" className={dividerStyle}>
				Or continue with
			</Typography.Base>
			<div className={socialButtonContainerStyle}>
				<Atom.TextButton icon="IconGithub">Github</Atom.TextButton>
				<Atom.TextButton icon="IconGoogle">Google</Atom.TextButton>
			</div>
		</>
	);
}
