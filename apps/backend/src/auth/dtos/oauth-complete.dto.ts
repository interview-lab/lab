import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * OAuth 가입 완료 요청 DTO
 */
@ApiSchema({
	name: 'OAuthCompleteDto',
	description: 'OAuth 가입 완료 DTO',
})
export class OAuthCompleteDto {
	@IsString()
	@ApiProperty({
		description: '임시 토큰',
		example: 'uuid-token',
	})
	tempToken!: string;

	@IsString()
	@MinLength(2)
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

	@IsString()
	@MinLength(6)
	@MaxLength(6)
	@ApiProperty({
		description: '이메일 인증 코드',
		example: '123456',
	})
	verificationCode!: string;
}
