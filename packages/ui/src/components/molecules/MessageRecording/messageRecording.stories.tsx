import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import MessageRecording from '@/components/molecules/MessageRecording';

const meta = {
	title: 'Design System/Molecule/MessageRecording',
	component: MessageRecording,
} satisfies Meta<typeof MessageRecording>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recording: Story = {
	args: {
		state: 'recording',
		time: 13,
	},
	render: () => {
		const [stream, setStream] = useState<MediaStream>();
		const [time, setTime] = useState(0);
		const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

		useEffect(() => {
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
				})
				.then(setStream);
		}, []);

		useEffect(() => {
			if (timerRef.current) return;

			timerRef.current = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);

			return () => {
				if (timerRef.current) {
					clearInterval(timerRef.current);
				}
			};
		}, []);

		return (
			<MessageRecording state="recording" time={time} mediaStream={stream} />
		);
	},
};

export const Paused: Story = {
	args: {
		state: 'paused',
		time: 13,
	},
};
