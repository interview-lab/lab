import type { ReactNode } from 'react';
import { messageContainerStyle } from './message.css';

type MessageProps = {
	type: 'sent' | 'received';
	children: ReactNode;
};

const Message = ({ type, children }: MessageProps) => {
	return (
		<div data-type={type} className={messageContainerStyle}>
			{children}
		</div>
	);
};

export default Message;
