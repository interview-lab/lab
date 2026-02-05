import type { Molecule } from '@interview-lab/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import catchError from '@/utils/catchError';
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

	const stopRecording = useCallback(() => {
		return new Promise<Blob>((resolve) => {
			const recorder = mediaRecorderRef.current;
			if (!recorder) return;

			recorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
				resolve(blob);
			};

			setRecordingState('processing');
			recorder.stop();
		});
	}, []);

	const errorRecording = () => {
		setRecordingState('error');
		setError(new Error('녹음 중 오류가 발생했습니다.'));
	};

	const initMediaRecorder = useCallback(async () => {
		const [error, stream] = await catchError(
			navigator.mediaDevices.getUserMedia({
				audio: true,
			}),
		);

		if (error) {
			setError(error);
			setRecordingState('error');
			return;
		}

		streamRef.current = stream;

		const recorder = new MediaRecorder(stream);
		recorder.ondataavailable = (event) => {
			chunksRef.current.push(event.data);
		};

		mediaRecorderRef.current = recorder;

		setRecordingState('idle');
	}, []);

	useEffect(() => {
		initMediaRecorder();

		return () => {
			if (mediaRecorderRef.current?.state === 'recording') {
				mediaRecorderRef.current.stop();
			}
			streamRef.current?.getAudioTracks().forEach((track) => {
				track.stop();
			});

			mediaRecorderRef.current = null;
			streamRef.current = null;
		};
	}, [initMediaRecorder]);

	return {
		stream: streamRef.current,
		recordingState,
		error,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		errorRecording,
		initMediaRecorder,
	} as const;
}
