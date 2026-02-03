import { CircleButton, Icon, TextButton } from '@/components/atoms';
import { buttonContainer, muteButton } from './interviewSubmitButton.css';

type InterviewSubmitButtonProps = {
	state: 'idle' | 'recording' | 'paused' | 'processing';
	onStartRecord?: () => void;
	onPause?: () => void;
	onResume?: () => void;
};

const BUTTION_OPTIONS: Record<
	InterviewSubmitButtonProps['state'],
	{ text: string; icon?: Parameters<typeof Icon>[0]['icon'] }
> = {
	idle: {
		text: 'Start Recording',
		icon: 'IconRecord',
	},
	recording: {
		text: 'Send Answer',
		icon: 'IconSend',
	},
	processing: {
		text: 'Processing',
		icon: 'Icon180Ring',
	},
	paused: {
		text: 'Paused',
	},
};

const InterviewSubmitButton = ({
	state,
	onPause,
	onStartRecord,
	onResume,
}: InterviewSubmitButtonProps) => {
	const option = BUTTION_OPTIONS[state];

	return (
		<div className={buttonContainer}>
			<TextButton
				disabled={state === 'processing' || state === 'paused'}
				onClick={onStartRecord}
			>
				{option.icon && <Icon icon={option.icon} width={24} />}
				{option.text}
			</TextButton>
			{(state === 'recording' || state === 'paused') && (
				<CircleButton
					className={muteButton}
					data-state={state}
					onClick={state === 'recording' ? onPause : onResume}
				/>
			)}
		</div>
	);
};

export default InterviewSubmitButton;
