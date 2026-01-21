import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

/**
 * 인증 이메일 발송 요청 DTO
 */
@ApiSchema({
	name: 'SendVerificationDto',
	description: '인증 이메일 발송 DTO',
})
export class SendVerificationDto {
	@IsEmail()
	@ApiProperty({
		description: '이메일 주소',
		example: 'test@example.com',
	})
	email!: string;
}

@ApiSchema({
	name: 'VerificationResponseDto',
	description: '인증 이메일 발송 응답 DTO',
})
export class VerificationResponseDto {
	@ApiProperty({
		description: '응답 메시지',
		example: '인증 이메일이 발송되었습니다.',
	})
	@IsString()
	message!: string;

	@ApiProperty({
		description: '남은 시간 (초)',
		example: 300,
	})
	@IsNumber()
	remainingTime!: number;
}
