import { Atom, Typography } from '@interview-lab/ui';
import clsx from 'clsx';
import { use } from 'react';
import {
	iconStyle,
	lineActiveStyle,
	lineBackgroundStyle,
	lineCompletedStyle,
	lineContainerStyle,
	lineStyle,
	pageStyle,
	progressContainerStyle,
	progressSectionStyle,
	questionNumberStyle,
	sideBarContentStyle,
	sideBarHeadingStyle,
	sideBarStyle,
} from './layout.css';

enum QuestionStatus {
	NOT_STARTED = 'NOT_STARTED',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
}

type Question = {
	id: string;
	subject: string;
	questionSummary: string;
	question: string;
	status: QuestionStatus;
};

const QUESTIONS: Question[] = [
	{
		id: '1',
		subject: '네트워크',
		questionSummary: 'OS란?',
		question: 'OS란 무엇인가요?',
		status: QuestionStatus.COMPLETED,
	},
	{
		id: '2',
		subject: '웹',
		questionSummary: 'REST API란?',
		question: 'REST API란 무엇인가요?',
		status: QuestionStatus.COMPLETED,
	},
	{
		id: '3',
		subject: '데이터베이스',
		questionSummary: '인덱스란?',
		question: '데이터베이스에서 인덱스란 무엇이고, 왜 사용하나요?',
		status: QuestionStatus.IN_PROGRESS,
	},
	{
		id: '4',
		subject: '자료구조',
		questionSummary: '해시 테이블이란?',
		question: '해시 테이블의 동작 원리와 시간 복잡도에 대해 설명해주세요.',
		status: QuestionStatus.NOT_STARTED,
	},
	{
		id: '5',
		subject: '운영체제',
		questionSummary: '프로세스 vs 스레드',
		question: '프로세스와 스레드의 차이점에 대해 설명해주세요.',
		status: QuestionStatus.NOT_STARTED,
	},
];

export default function InterviewLayout({
	children,
	params,
}: {
	params: Promise<{ sessionId: string }>;
	children: React.ReactNode;
}) {
	const { sessionId } = use(params);

	return (
		<div className={pageStyle}>
			{' '}
			<aside className={sideBarStyle}>
				<div className={sideBarContentStyle}>
					<div className={sideBarHeadingStyle}>
						<Atom.SquareButton icon="IconGraph" active={true} />
						<Typography.Base style="primary" textType="h1">
							Interview Lab
						</Typography.Base>
					</div>
					<div className={progressSectionStyle}>
						<Typography.Base style="primary" textType="p">
							INTERVIEW PROGRESS
						</Typography.Base>
						<div className={progressContainerStyle}>
							{QUESTIONS.map((question, index) => (
								<div key={question.id} data-status={question.status}>
									<div className={lineContainerStyle}>
										<span className={lineBackgroundStyle} />
										<span
											className={clsx(
												lineStyle,
												question.status === QuestionStatus.IN_PROGRESS &&
													lineActiveStyle,
												question.status === QuestionStatus.COMPLETED &&
													lineCompletedStyle,
											)}
										/>
										<div className={questionNumberStyle}>
											{question.status === QuestionStatus.NOT_STARTED ? (
												index + 1
											) : question.status === QuestionStatus.IN_PROGRESS ? (
												<div className={iconStyle} />
											) : (
												<Atom.Icon icon="IconCheck" />
											)}
										</div>
									</div>
									<div>
										<Typography.Base style="primary" textType="p">
											Q{index + 1}. {question.questionSummary}
										</Typography.Base>
										<Typography.Base style="primary" textType="p">
											{question.subject}
										</Typography.Base>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<Atom.TextButton>
					세션종료
					<Atom.Icon icon="IconX" />
				</Atom.TextButton>
			</aside>
			{sessionId}
			{children}
		</div>
	);
}
