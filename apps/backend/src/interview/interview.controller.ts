import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import {
	ApiCookieAuth,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '@/auth/guards/token.guard';
import type { UserModel } from '@/generated/prisma/models';
import { User } from '@/users/decorators/user.decorator';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { CurrentInterviewDto } from './dto/current-interview.dto';
import { InterviewService } from './interview.service';

@Controller('interview')
@ApiTags('인터뷰')
export class InterviewController {
	constructor(private readonly interviewService: InterviewService) {}

	@Post()
	@UseGuards(AccessTokenGuard)
	@ApiOperation({
		summary: '인터뷰 세션 생성 API',
		description: '새로운 인터뷰 세션을 생성합니다.',
	})
	@ApiCookieAuth('accessToken')
	@ApiOkResponse({ type: CreateInterviewDto })
	async createInterview(@User() user: UserModel) {
		const session = await this.interviewService.createInterviewSession(user.id);

		return plainToInstance(CreateInterviewDto, session, {
			excludeExtraneousValues: true,
		});
	}

	@Get(':id')
	@ApiCookieAuth('accessToken')
	@ApiOperation({
		summary: '인터뷰 세션 조회 API',
		description: '세션 ID로 현재 인터뷰 진행 상황과 질문을 조회합니다.',
	})
	@ApiParam({ name: 'id', description: '인터뷰 세션 ID' })
	@ApiOkResponse({ type: CurrentInterviewDto })
	async getInterview(@Param('id') id: string) {
		const [error, session] = await this.interviewService.findSessionById(id);

		if (error) {
			throw new BadRequestException(error.reason);
		}

		const numOfcurrentGeneratedQuestion = session.questions.length;

		// 새로운 질문 생성
		if (
			numOfcurrentGeneratedQuestion === session.numOfCompletedQuestions &&
			numOfcurrentGeneratedQuestion < session.totalQuestions
		) {
			const newQuestion = await this.interviewService.createQuestion(
				id,
				session.category,
				session.difficulty,
			);

			return plainToInstance(
				CurrentInterviewDto,
				{
					totalQuestion: session.totalQuestions,
					currentQuestion: session.numOfCompletedQuestions + 1,
					question: newQuestion.content, // 현재는 빈 문자열, Mastra가 채울 예정
					category: newQuestion.category,
					difficulty: newQuestion.difficulty,
					status: session.status,
				},
				{ excludeExtraneousValues: true },
			);
		}

		// 모든 질문 답변 완료
		if (numOfcurrentGeneratedQuestion === session.numOfCompletedQuestions) {
			return plainToInstance(
				CurrentInterviewDto,
				{
					totalQuestion: session.totalQuestions,
					currentQuestion: session.numOfCompletedQuestions,
					question: '',
					category: session.category,
					difficulty: session.difficulty,
					status: 'COMPLETED',
				},
				{ excludeExtraneousValues: true },
			);
		}

		// 기존 질문 반환
		const [currentQuestionError, currentQuestion] =
			await this.interviewService.getCurrentSessionQuestion(id);

		if (currentQuestionError) {
			throw new BadRequestException(currentQuestionError.reason);
		}

		return plainToInstance(
			CurrentInterviewDto,
			{
				totalQuestion: session.totalQuestions,
				currentQuestion: session.numOfCompletedQuestions + 1,
				question: '',
				category: currentQuestion.category,
				difficulty: currentQuestion.difficulty,
				status: session.status,
			},
			{ excludeExtraneousValues: true },
		);
	}
}
