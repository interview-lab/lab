import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

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
