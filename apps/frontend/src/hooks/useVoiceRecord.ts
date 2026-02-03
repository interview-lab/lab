import { useEffect, useRef, useState } from 'react';

export default function useVoiceRecord() {
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
	const streamRef = useRef<MediaStream>(undefined);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		(async () => {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			streamRef.current = stream;

			const recorder = new MediaRecorder(stream);
			recorder.ondataavailable = (event) => {
				chunksRef.current.push(event.data);
			};

			setMediaRecorder(recorder);
		})();

		return () => {
			streamRef.current?.getAudioTracks().forEach((track) => {
				track.stop();
			});
		};
	}, []);

	return [streamRef.current, mediaRecorder, chunksRef.current] as const;
}
