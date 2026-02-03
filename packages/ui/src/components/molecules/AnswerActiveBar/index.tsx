import clsx from 'clsx';
import { CircleButton, TextButton } from '@/components/atoms';
import {
	containerStyle,
	muteButtonStyle,
	sendButtonStyle,
} from './AnswerActiveBar.css';

type AnswerActiveBarProps = {
	isMuted?: boolean;
	onSend?: () => void;
	onMuteToggle?: () => void;
	className?: string;
};

const AnswerActiveBar = ({
	isMuted = false,
	onSend,
	onMuteToggle,
	className,
}: AnswerActiveBarProps) => {
	return (
		<div className={clsx(containerStyle, className)}>
			<TextButton icon="IconSend" className={sendButtonStyle} onClick={onSend}>
				Send Answer
			</TextButton>
			<CircleButton
				icon={isMuted ? 'IconMute' : 'IconRecord'}
				onClick={onMuteToggle}
				className={muteButtonStyle}
			/>
		</div>
	);
};

export default AnswerActiveBar;
