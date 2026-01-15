import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
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

const TOTAL_QUESTIONS = 10;

type InterviewAnswerResultCardProps = HTMLAttributes<HTMLDivElement> & {
	/** 카드 타입: success(잘 답변한 질문) fail(보완이 필요한 질문) */
	variant: 'success' | 'fail';
	/** 맞은 문제 수 */
	correctCount: number;
	/** 틀린 문제 수 */
	incorrectCount: number;
};

const InterviewAnswerResultCard = ({
	variant,
	correctCount,
	incorrectCount,
	className,
	...props
}: InterviewAnswerResultCardProps) => {
	const isSuccess = variant === 'success';
	const count = isSuccess ? correctCount : incorrectCount;
	const accuracy = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

	const getTitle = () => {
		return isSuccess ? '잘 답변한 질문' : '보완이 필요한 질문';
	};

	const getFooterMessage = () => {
		if (isSuccess) {
			return `정확도 ${accuracy}%`;
		}

		if (incorrectCount === 0) {
			return '완벽해요!';
		}
		if (incorrectCount >= 1 && incorrectCount <= 3) {
			return '복습 권장';
		}
		return '집중 학습 필요';
	};

	return (
		<div className={clsx(containerStyle, className)} {...props}>
			<div className={headerStyle}>
				<p className={titleStyle}>{getTitle()}</p>
				<Icon
					icon={isSuccess ? 'IconLike' : 'IconExclamation'}
					className={isSuccess ? iconSuccessStyle : iconFailStyle}
				/>
			</div>
			<h2 className={scoreStyle}>{count}개</h2>
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
