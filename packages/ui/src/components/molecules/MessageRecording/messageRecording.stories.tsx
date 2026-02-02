import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
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

		useEffect(() => {
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
				})
				.then(setStream);
		}, []);

		return (
			<MessageRecording state="recording" time={13} mediaStream={stream} />
		);
	},
};

export const Paused: Story = {
	args: {
		state: 'paused',
		time: 13,
	},
};
