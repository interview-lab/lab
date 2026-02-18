import { Injectable } from '@nestjs/common';
import { Category, Difficulty } from '@/generated/prisma/enums';
import { SessionModel } from '@/generated/prisma/models';
import { PrismaService } from '@/prisma/prisma.service';
import { err, ok } from '@/utils/result';

@Injectable()
export class InterviewService {
	constructor(private readonly prismaService: PrismaService) {}

	async createInterviewSession(userId: SessionModel['userId']) {
		return await this.prismaService.session.create({
			data: {
				userId,
				status: 'IN_PROGRESS',
			},
		});
	}

	async findSessionById(sessionId: SessionModel['id']) {
		const session = await this.prismaService.session.findUnique({
			where: {
				id: sessionId,
			},
			include: {
				questions: true,
			},
		});

		if (!session) {
			return err({ reason: 'Session not found' });
		}

		return ok(session);
	}

	async changeInterviewSessionStatus(
		sessionId: SessionModel['id'],
		status: SessionModel['status'],
	) {
		const session = await this.prismaService.session.update({
			data: { status },
			where: { id: sessionId },
		});

		if (!session) {
			return err({ reason: 'Session not found' });
		}

		return ok(session);
	}

	async createQuestion(
		sessionId: SessionModel['id'],
		sessionCagegory: SessionModel['category'],
		sessionDifficuly: SessionModel['difficulty'],
	) {
		// 카테코리가 없으면 카테고리 랜덤 선택
		let category = sessionCagegory;

		const categoryList = Object.values(Category);

		if (!category) {
			category = categoryList[
				Math.floor(Math.random() * categoryList.length)
			] as Category;
		}

		let difficulty = sessionDifficuly;

		const difficultyList = Object.values(Difficulty);

		if (!difficulty) {
			difficulty = difficultyList[
				Math.floor(Math.random() * difficultyList.length)
			] as Difficulty;
		}

		/*
    위의 정보를 가지고 mastra agent가 질문을 생성한다.
		*/

		return this.prismaService.question.create({
			data: {
				sessionId,
				category,
				difficulty,
				content: '',
			},
		});
	}

	async getQuestionsBySessionId(sessionId: SessionModel['id']) {
		const questions = await this.prismaService.question.findMany({
			where: {
				sessionId,
			},
		});

		if (!questions) {
			return err({ reason: 'Questions not found' });
		}

		return ok(questions);
	}

	async getCurrentSessionQuestion(sessionId: SessionModel['id']) {
		const [sessionError, session] = await this.findSessionById(sessionId);

		if (sessionError) {
			return err(sessionError);
		}
		const [questionError, questions] =
			await this.getQuestionsBySessionId(sessionId);

		if (questionError) {
			return err(questionError);
		}

		const currentQuestion = questions[session.numOfCompletedQuestions];

		if (!currentQuestion) {
			return err({ reason: 'Question not found' });
		}

		return ok(currentQuestion);
	}
}
