'use client';

import { Molecule } from '@interview-lab/ui';
import {
	buttonContainerStyle,
	pageStyle,
	questionContainerStyle,
} from './page.css';

export default function InterviewPage({
	params,
}: {
	params: Promise<{ sessionId: string }>;
}) {
	return (
		<div className={pageStyle}>
			<div className={questionContainerStyle}></div>
			<div className={buttonContainerStyle}>
				<Molecule.InterviewSubmitButton state="idle" />
				<p>Press 'Start Recording' to answer the question.</p>
			</div>
		</div>
	);
}
