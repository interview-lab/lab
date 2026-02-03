'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import { useEffect, useState } from 'react';
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
	const [stream, setStream] = useState<MediaStream>();
	const [state, setState] =
		useState<Parameters<typeof Molecule.InterviewSubmitButton>[0]['state']>(
			'idle',
		);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
			})
			.then(setStream);
	}, []);

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
				<Molecule.MessageRecording
					state={state === 'recording' ? 'recording' : 'paused'}
					mediaStream={stream}
				/>
			</div>
			<div className={buttonContainerStyle}>
				<Molecule.InterviewSubmitButton
					state={state}
					onStartRecord={() => setState('recording')}
					onPause={() => setState('paused')}
					onResume={() => setState('recording')}
				/>
				<p>Press 'Start Recording' to answer the question.</p>
			</div>
		</div>
	);
}
