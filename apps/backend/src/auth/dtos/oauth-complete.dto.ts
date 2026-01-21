import { AUTH } from '@interview-lab/shared';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
	IsEmail,
	IsNumberString,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import AUTH_MESSAGE from '@/auth/consts/message.const';
import EMAIL_MESSAGE from '@/email/consts/message.const';

/**
 * OAuth 가입 완료 요청 DTO
 */
@ApiSchema({
	name: 'OAuthCompleteDto',
	description: 'OAuth 가입 완료 DTO',
})
export class OAuthCompleteDto {
	@IsString()
	@MinLength(AUTH.CONST.USERNAME_MIN_LENGTH, {
		message: AUTH_MESSAGE.ERROR_USERNAME_LENGTH,
	})
	@MaxLength(20)
	@ApiProperty({
		description: '사용자명',
		example: 'username',
	})
	username!: string;

	@IsEmail()
	@ApiProperty({
		description: '이메일 주소',
		example: 'test@example.com',
	})
	email!: string;

	@IsNumberString()
	@MinLength(AUTH.CONST.VERIFICATION_CODE_LENGTH, {
		message: EMAIL_MESSAGE.ERROR_VERIFICATION_CODE_LENGTH,
	})
	@MaxLength(AUTH.CONST.VERIFICATION_CODE_LENGTH, {
		message: EMAIL_MESSAGE.ERROR_VERIFICATION_CODE_LENGTH,
	})
	@ApiProperty({
		description: '이메일 인증 코드',
		example: '123456',
	})
	verificationCode!: string;
}
