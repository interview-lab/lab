import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

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

/**
 * 인증번호 확인 요청 DTO
 */
@ApiSchema({
	name: 'VerifyCodeDto',
	description: '이메일 인증 확인 DTO',
})
export class VerifyCodeDto {
	@IsEmail()
	@ApiProperty({
		description: '이메일 주소',
		example: 'test@example.com',
	})
	email!: string;

	@IsString()
	@ApiProperty({
		description: '인증 코드',
		example: '123456',
	})
	code!: string;
}
