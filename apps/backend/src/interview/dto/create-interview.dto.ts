import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SessionModel } from '@/generated/prisma/models';

@ApiSchema({
	name: 'CreateInterviewDto',
	description: '인터뷰 세션 생성 응답 DTO',
})
export class CreateInterviewDto {
	@Expose()
	@ApiProperty({ description: '인터뷰 세션 ID', example: 'clxyz1234...' })
	id!: SessionModel['id'];
}
