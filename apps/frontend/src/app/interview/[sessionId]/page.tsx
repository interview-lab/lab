'use client';

import { Atom, Molecule } from '@interview-lab/ui';
import useVoiceRecord, { type RecordingState } from '@/hooks/useVoiceRecord';
import {
	buttonContainerStyle,
	buttonDescriptionStyle,
	pageStyle,
	questionContainerStyle,
	questionTextStyle,
	tipTextStyle,
} from './page.css';

const DESCRIPTIONS: Record<RecordingState, string> = {
	idle: '답변을 시작해주세요.',
	recording: '답변을 전송하거나 일시정지 할 수 있습니다.',
	paused: '답변을 재개해주세요.',
	processing: '답변을 처리중입니다...',
	error: '마이크 권한을 허용해주세요.',
} as const;

export default function InterviewPage({
	params,
}: {
	params: Promise<{ sessionId: string }>;
}) {
	const {
		recordingState,
		stream,
		chunks,
		error,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
	} = useVoiceRecord();

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
					state={recordingState === 'recording' ? 'recording' : 'paused'}
					mediaStream={stream}
				/>
			</div>
			<div className={buttonContainerStyle}>
				<Molecule.InterviewSubmitButton
					state={recordingState}
					onStartRecord={startRecording}
					onPause={pauseRecording}
					onResume={resumeRecording}
					onSubmit={stopRecording}
				/>
				<p className={buttonDescriptionStyle}>{DESCRIPTIONS[recordingState]}</p>
			</div>
		</div>
	);
}
