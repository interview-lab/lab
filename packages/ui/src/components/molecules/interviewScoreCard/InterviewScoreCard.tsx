import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';
import {
	badgeStyle,
	containerStyle,
	diffBaseStyle,
	footerStyle,
	headerStyle,
	iconStyle,
	scoreStyle,
	titleStyle,
} from '@/components/molecules/InterviewScoreCard/interviewScoreCard.css';

type InterviewScoreCardProps = HTMLAttributes<HTMLDivElement> & {
	/** 점수 (0-100) */
	score: number;
	/** 상위 퍼센트 (예: 10이면 "상위 10%") */
	percentile?: number;
	/** 지난 세션 대비 점수 변화 (양수: 상승, 음수: 하락) */
	scoreDiff?: number;
};

const InterviewScoreCard = ({
	score,
	percentile,
	scoreDiff,
	className,
	...props
}: InterviewScoreCardProps) => {
	const formatDiff = () => {
		if (scoreDiff === undefined) return null;
		if (scoreDiff === 0) return '변동 없음';
		const sign = scoreDiff > 0 ? '+' : '';
		return `지난 세션 대비 ${sign}${scoreDiff}점`;
	};

	return (
		<div className={clsx(containerStyle, className)} {...props}>
			<div className={headerStyle}>
				<p className={titleStyle}>종합 점수</p>
				<Icon icon="IconGraph" className={iconStyle} />
			</div>
			<h2 className={scoreStyle}>{score}점</h2>
			<div className={footerStyle}>
				{percentile !== undefined && (
					<Badge className={badgeStyle}>상위 {percentile}%</Badge>
				)}
				{scoreDiff !== undefined && (
					<span className={diffBaseStyle}>{formatDiff()}</span>
				)}
			</div>
		</div>
	);
};

export default InterviewScoreCard;
