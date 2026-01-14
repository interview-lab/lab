import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * OAuth 가입 완료 요청 DTO
 */
export class OAuthCompleteDto {
	@IsString()
	tempToken!: string;

	@IsString()
	@MinLength(2)
	@MaxLength(20)
	username!: string;

	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(6)
	@MaxLength(6)
	verificationCode!: string;
}
