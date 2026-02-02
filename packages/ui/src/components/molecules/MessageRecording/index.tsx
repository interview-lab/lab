import { useEffect, useRef, useState } from 'react';
import { Badge, Icon, Message } from '@/components/atoms';
import { badgeStyle, canvasStyle, timeStyle } from './messageRecording.css';

const MINUTE = 60;

type MessageRecordingProps = {
	state: 'recording' | 'paused';
	mediaStream?: MediaStream;
};

const BAR_WIDTH = 4;
const BAR_GAP = 2;
const BAR_MIN_HEIGHT = 8;
const BAR_RADIUS = 2;
const BAR_COLOR = 'rgba(255, 255, 255, 0.6)';

const drawBars = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	dataArray: Uint8Array,
) => {
	ctx.clearRect(0, 0, width, height);

	const barCount = Math.min(
		Math.floor(width / (BAR_WIDTH + BAR_GAP)),
		dataArray.length,
	);
	const totalWidth = barCount * (BAR_WIDTH + BAR_GAP) - BAR_GAP;
	const startX = (width - totalWidth) / 2;
	const centerY = height / 2;

	ctx.fillStyle = BAR_COLOR;

	const mul = Math.floor(dataArray.length / barCount);

	for (let i = 0; i < barCount; i++) {
		let sum = 0;
		for (
			let dataIndex = i * mul;
			dataIndex < (i + 1) * mul && dataIndex < dataArray.length;
			dataIndex++
		) {
			// biome-ignore lint/style/noNonNullAssertion: <dataArray[i]는 항상 존재함>
			sum += dataArray[dataIndex]!;
		}
		const avg = sum / mul;

		const barHeight = (avg / 255) * (height * 0.8);
		const clampedHeight = Math.max(barHeight, BAR_MIN_HEIGHT);
		const x = startX + i * (BAR_WIDTH + BAR_GAP);
		const y = centerY - clampedHeight / 2;

		ctx.beginPath();
		ctx.roundRect(x, y, BAR_WIDTH, clampedHeight, BAR_RADIUS);
		ctx.fill();
	}
};

const MessageRecording = ({ state, mediaStream }: MessageRecordingProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationIdRef = useRef<number>(0);
	const audioContextRef = useRef<AudioContext | null>(null);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [time, setTime] = useState(0);

	const minute = String(time ? Math.floor(time / MINUTE) : 0).padStart(2, '0');
	const second = String(time ? time % MINUTE : 0).padStart(2, '0');

	useEffect(() => {
		if (state !== 'recording' || !mediaStream) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		ctx.scale(dpr, dpr);

		const width = rect.width;
		const height = rect.height;

		const audioContext = new AudioContext();
		audioContextRef.current = audioContext;
		const source = audioContext.createMediaStreamSource(mediaStream);
		const analyser = audioContext.createAnalyser();
		analyser.fftSize = 64;
		source.connect(analyser);

		const dataArray = new Uint8Array(analyser.frequencyBinCount);

		const draw = () => {
			analyser.getByteFrequencyData(dataArray);
			drawBars(ctx, width, height, dataArray);
			animationIdRef.current = requestAnimationFrame(draw);
		};
		draw();

		return () => {
			cancelAnimationFrame(animationIdRef.current);
			audioContext.close();
			audioContextRef.current = null;
		};
	}, [state, mediaStream]);

	useEffect(() => {
		if (state === 'paused') {
			cancelAnimationFrame(animationIdRef.current);
		}
	}, [state]);

	useEffect(() => {
		if (state === 'paused' && timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}

		if (timerRef.current || state === 'paused') return;

		timerRef.current = setInterval(() => {
			setTime((prev) => prev + 1);
		}, 1000);

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [state]);

	return (
		<Message type="sent">
			<Badge className={badgeStyle}>
				<Icon
					icon={state === 'recording' ? 'IconRecord' : 'IconMute'}
					width={16}
					height={20}
				/>
				{state === 'recording' ? 'LISTENING' : 'PAUSED'}
			</Badge>
			<p className={timeStyle}>{`${minute}:${second}`}</p>
			<canvas ref={canvasRef} className={canvasStyle} />
		</Message>
	);
};

export default MessageRecording;
