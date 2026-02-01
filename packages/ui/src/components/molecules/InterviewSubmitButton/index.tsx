import { CircleButton, Icon, TextButton } from '@/components/atoms';
import { buttonContainer, muteButton } from './interviewSubmitButton.css';

type IdleStateProps = {
	state: 'idle';
	onClick?: () => void;
};

type RecordingStateProps = {
	state: 'recording';
	onClick?: () => void;
	onPause?: () => void;
};

type PausedStateProps = {
	state: 'paused';
	onClick?: () => void;
	onResume?: () => void;
};

type ProcessingStateProps = {
	state: 'processing';
	onClick?: () => void;
};

type InterviewSubmitButtonProps =
	| IdleStateProps
	| RecordingStateProps
	| PausedStateProps
	| ProcessingStateProps;

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

const InterviewSubmitButton = (props: InterviewSubmitButtonProps) => {
	const option = BUTTION_OPTIONS[props.state];

	return (
		<div className={buttonContainer}>
			<TextButton
				disabled={props.state === 'processing' || props.state === 'paused'}
				onClick={props.onClick}
			>
				{option.icon && <Icon icon={option.icon} width={24} />}
				{option.text}
			</TextButton>
			{(props.state === 'recording' || props.state === 'paused') && (
				<CircleButton
					className={muteButton}
					data-state={props.state}
					onClick={props.state === 'recording' ? props.onPause : props.onResume}
				/>
			)}
		</div>
	);
};

export default InterviewSubmitButton;
