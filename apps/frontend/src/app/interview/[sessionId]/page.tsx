'use client';

import { Atom, Molecule, Typography } from '@interview-lab/ui';
import {
	buttonContainerStyle,
	pageStyle,
	questionContainerStyle,
	questionTextStyle,
	tipTextStyle,
} from './page.css';

export default function InterviewPage({
	params,
}: {
	params: Promise<{ sessionId: string }>;
}) {
	return (
		<div className={pageStyle}>
			<div className={questionContainerStyle}>
				<Atom.Message type="received">
					<Molecule.SubjectBadge type="os" />
					<p className={questionTextStyle}>
						프로세스와 스레드의 차이에 대해 설명해주세요.
					</p>
					<p className={tipTextStyle}>
						Tip: 메모리 공유 방식과 실행 단위(Context Switching)의 관점에서
						비교하여 답변하면 좋은 점수를 받을 수 있습니다.
					</p>
				</Atom.Message>
				<Molecule.MessageRecording state="paused" />
			</div>
			<div className={buttonContainerStyle}>
				<Molecule.InterviewSubmitButton state="idle" />
				<p>Press 'Start Recording' to answer the question.</p>
			</div>
		</div>
	);
}
