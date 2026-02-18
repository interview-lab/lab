import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { QuestionModel, SessionModel } from '@/generated/prisma/models';

@ApiSchema({
	name: 'CurrentInterviewDto',
	description: '현재 인터뷰 진행 상황 DTO',
})
export class CurrentInterviewDto {
	@Expose()
	@ApiProperty({ description: '전체 질문 수', example: 5 })
	totalQuestion!: number;

	@Expose()
	@ApiProperty({ description: '현재 질문 번호', example: 1 })
	currentQuestion!: number;

	@Expose()
	@ApiProperty({
		description: '질문 내용',
		example: 'TCP와 UDP의 차이를 설명하세요.',
	})
	question!: string;

	@Expose()
	@ApiProperty({
		description: '질문 카테고리',
		enum: [
			'NETWORK',
			'OS',
			'FRONTEND',
			'BACKEND',
			'DATA_STRUCTURE',
			'DATABASE',
			'ALGORITHM',
		],
		example: 'NETWORK',
	})
	category!: QuestionModel['category'];

	@Expose()
	@ApiProperty({
		description: '난이도',
		enum: ['EASY', 'MEDIUM', 'HARD'],
		example: 'MEDIUM',
	})
	difficulty!: QuestionModel['difficulty'];

	@Expose()
	@ApiProperty({
		description: '세션 상태',
		enum: ['IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
		example: 'IN_PROGRESS',
	})
	status!: SessionModel['status'];
}
