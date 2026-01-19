'use client';
import { Atom, Molecule, Typography } from '@interview-lab/ui';
import { usePathname, useRouter } from 'next/navigation';
import { dividerStyle, socialButtonContainerStyle } from './layout.css';

type ToggleValue = (typeof ToggleOptions)[number]['value'];

type Page = 'login' | 'signup' | 'additional-info';

const ToggleOptions = [
	{ value: 'login', label: 'Login' },
	{ value: 'signup', label: 'Sign Up' },
] as const;

const PAGE_TITLE: Record<Page, string> = {
	login: 'Welcome back',
	signup: 'Create an account',
	'additional-info': 'Additional information',
} as const;

const PAGE_DESCRIPTION: Record<Page, string> = {
	login: 'Access real interview questions and practice tools.',
	signup: 'Enter your details to access your interview dashboard.',
	'additional-info': 'Enter your details to access your interview dashboard.',
} as const;

export default function FormLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const mode = usePathname().split('/').pop() as Page;

	const handleModeChange = (value: ToggleValue) => {
		router.replace(`/${value}`);
	};

	return (
		<>
			<Typography.Title textType="h2" style="primary">
				{PAGE_TITLE[mode]}
			</Typography.Title>
			<Typography.Base textType="p" style="secondary">
				{PAGE_DESCRIPTION[mode]}
			</Typography.Base>
			{(mode === 'login' || mode === 'signup') && (
				<Molecule.Toggle
					items={ToggleOptions}
					selectedValue={mode as ToggleValue}
					onSelect={handleModeChange}
				/>
			)}
			{children}
			{(mode === 'login' || mode === 'signup') && (
				<>
					<Typography.Base
						textType="p"
						style="secondary"
						className={dividerStyle}
					>
						Or continue with
					</Typography.Base>
					<div className={socialButtonContainerStyle}>
						<a href={`${process.env.NEXT_PUBLIC_API_SERVER}/auth/google`}>
							<Atom.TextButton icon="IconGithub">Github</Atom.TextButton>
						</a>
						<a href={`${process.env.NEXT_PUBLIC_API_SERVER}/auth/google`}>
							<Atom.TextButton icon="IconGoogle">Google</Atom.TextButton>
						</a>
					</div>
				</>
			)}
		</>
	);
}
