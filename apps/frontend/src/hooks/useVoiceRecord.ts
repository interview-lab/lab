import type { Molecule } from '@interview-lab/ui';
import { useEffect, useRef, useState } from 'react';

export type RecordingState = Parameters<
	typeof Molecule.InterviewSubmitButton
>[0]['state'];

export default function useVoiceRecord() {
	const [recordingState, setRecordingState] = useState<RecordingState>('idle');
	const [error, setError] = useState<Error | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder>(null);
	const streamRef = useRef<MediaStream>(undefined);
	const chunksRef = useRef<Blob[]>([]);

	const startRecording = () => {
		setRecordingState('recording');
		mediaRecorderRef.current?.start();
	};

	const pauseRecording = () => {
		setRecordingState('paused');
		mediaRecorderRef.current?.pause();
	};

	const resumeRecording = () => {
		setRecordingState('recording');
		mediaRecorderRef.current?.resume();
	};

	const stopRecording = () => {
		setRecordingState('processing');
		mediaRecorderRef.current?.stop();
	};

	useEffect(() => {
		(async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});

				streamRef.current = stream;

				const recorder = new MediaRecorder(stream);
				recorder.ondataavailable = (event) => {
					chunksRef.current.push(event.data);
				};

				mediaRecorderRef.current = recorder;
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
					setRecordingState('error');
				} else {
					setError(new Error('마이크에 엑세스하는데 문제가 발생했습니다.'));
					setRecordingState('error');
					alert('마이크에 엑세스하는데 문제가 발생했습니다.');
				}
			}
		})();

		return () => {
			streamRef.current?.getAudioTracks().forEach((track) => {
				track.stop();
			});
		};
	}, []);

	return {
		stream: streamRef.current,
		chunks: chunksRef.current,
		error,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		recordingState,
	} as const;
}
