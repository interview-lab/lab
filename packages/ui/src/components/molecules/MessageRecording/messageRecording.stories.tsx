import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import MessageRecording from '@/components/molecules/MessageRecording';

const meta = {
	title: 'Design System/Molecule/MessageRecording',
	component: MessageRecording,

	argTypes: {
		mediaStream: {
			table: {
				disable: true,
			},
		},
	},

	render: (props) => {
		const [stream, setStream] = useState<MediaStream>();

		useEffect(() => {
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
				})
				.then(setStream);
		}, []);

		return <MessageRecording {...props} mediaStream={stream} />;
	},
} satisfies Meta<typeof MessageRecording>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recording: Story = {
	args: {
		state: 'recording',
	},
};

export const Paused: Story = {
	args: {
		state: 'paused',
	},
};
