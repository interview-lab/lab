import { IsEmail, IsString } from 'class-validator';

/**
 * 인증 이메일 발송 요청 DTO
 */
export class SendVerificationDto {
	@IsEmail()
	email!: string;
}

/**
 * 인증번호 확인 요청 DTO
 */
export class VerifyCodeDto {
	@IsEmail()
	email!: string;

	@IsString()
	code!: string;
}
