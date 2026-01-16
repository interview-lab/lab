'use client';

import { Atom } from '@interview-lab/ui';
import * as Typography from '@interview-lab/ui/typographies';
import Image from 'next/image';
import {
	authImageContentStyle,
	authImageStyle,
	authLayoutStyle,
	column1Style,
	column2Style,
	formContainerStyle,
	iconContainerStyle,
} from './layout.css';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={authLayoutStyle}>
			<div className={column1Style}>
				<div className={formContainerStyle}>
					<Typography.Title textType="h2" style="primary">
						Welcome back
					</Typography.Title>
					<Typography.Base textType="p" style="secondary">
						Enter your details to access your interview dashboard.
					</Typography.Base>
					<div>{children}</div>
				</div>
			</div>
			<div className={column2Style}>
				<Image
					src="/images/login.png"
					alt="login"
					fill
					preload
					loading="eager"
					className={authImageStyle}
				/>
				<section className={authImageContentStyle}>
					<div>
						<Atom.SquareButton
							icon="IconDataStructure"
							className={iconContainerStyle}
						/>
						<Atom.SquareButton
							icon="IconDatabase"
							className={iconContainerStyle}
						/>
						<Atom.SquareButton
							icon="IconNetwork"
							className={iconContainerStyle}
						/>
					</div>
					<Typography.Title textType="h2" style="secondary">
						Master the technical interview.
					</Typography.Title>
					<Typography.Base textType="p" style="secondary">
						Join over 20,000 developers practicing with real interview questions
						from top tech companies. Write code, run tests, and get hired.
					</Typography.Base>
				</section>
			</div>
		</div>
	);
}
