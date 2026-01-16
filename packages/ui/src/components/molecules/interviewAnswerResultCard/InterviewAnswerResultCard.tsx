import clsx from 'clsx';
import Icon from '@/components/atoms/Icon';
import {
	containerStyle,
	footerFailStyle,
	footerIconStyle,
	footerSuccessStyle,
	headerStyle,
	iconFailStyle,
	iconSuccessStyle,
	scoreStyle,
	titleStyle,
} from '@/components/molecules/InterviewAnswerResultCard/interviewAnswerResultCard.css';

type BaseProps = {
	className?: string;
};

/** 잘 답변한 질문 카드 */
type SuccessCardProps = {
	variant: 'success';
	/** 맞은 문제 수 */
	correctCount: number;
	/** 전체 문제 수 (정확도 계산용) */
	totalQuestions: number;
};

/** 보완이 필요한 질문 카드 */
type FailCardProps = {
	variant: 'fail';
	/** 틀린 문제 수 */
	incorrectCount: number;
};

type InterviewAnswerResultCardProps = (SuccessCardProps | FailCardProps) &
	BaseProps;

const InterviewAnswerResultCard = (props: InterviewAnswerResultCardProps) => {
	const { variant, className } = props;
	const isSuccess = variant === 'success';

	const getCount = () => {
		return isSuccess ? props.correctCount : props.incorrectCount;
	};

	const getTitle = () => {
		return isSuccess ? '잘 답변한 질문' : '보완이 필요한 질문';
	};

	const getFooterMessage = () => {
		if (isSuccess) {
			const accuracy = Math.round(
				(props.correctCount / props.totalQuestions) * 100,
			);
			return `정확도 ${accuracy}%`;
		}

		const { incorrectCount } = props;
		if (incorrectCount === 0) {
			return '완벽해요!';
		}
		if (incorrectCount >= 1 && incorrectCount <= 3) {
			return '복습 권장';
		}
		return '집중 학습 필요';
	};

	return (
		<div className={clsx(containerStyle, className)}>
			<div className={headerStyle}>
				<p className={titleStyle}>{getTitle()}</p>
				<Icon
					icon={isSuccess ? 'IconLike' : 'IconExclamation'}
					className={isSuccess ? iconSuccessStyle : iconFailStyle}
				/>
			</div>
			<h2 className={scoreStyle}>{getCount()}개</h2>
			<div className={isSuccess ? footerSuccessStyle : footerFailStyle}>
				<Icon
					icon={isSuccess ? 'IconUp' : 'IconWarning'}
					className={footerIconStyle}
				/>
				<span>{getFooterMessage()}</span>
			</div>
		</div>
	);
};

export default InterviewAnswerResultCard;
