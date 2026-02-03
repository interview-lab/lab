import type { Molecule } from '@interview-lab/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export type RecordingState = Parameters<
	typeof Molecule.InterviewSubmitButton
>[0]['state'];

/**
 * 오디오 녹음을 관리하는 훅
 * @returns 녹음 상태와 제어 함수
 */
export default function useVoiceRecord() {
	const [recordingState, setRecordingState] = useState<RecordingState>('idle');
	const [error, setError] = useState<Error | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder>(null);
	const streamRef = useRef<MediaStream>(null);
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

	const errorRecording = () => {
		setRecordingState('error');
		setError(new Error('녹음 중 오류가 발생했습니다.'));
	};

	const initMediaRecorder = useCallback(async () => {
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

			setRecordingState('idle');
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error
					: new Error('마이크에 액세스하는데 문제가 발생했습니다.');
			setError(errorMessage);
			setRecordingState('error');
		}
	}, []);

	useEffect(() => {
		initMediaRecorder();

		return () => {
			streamRef.current?.getAudioTracks().forEach((track) => {
				track.stop();
			});
		};
	}, [initMediaRecorder]);

	return {
		stream: streamRef.current,
		chunks: chunksRef.current,
		error,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		errorRecording,
		initMediaRecorder,
		recordingState,
	} as const;
}
