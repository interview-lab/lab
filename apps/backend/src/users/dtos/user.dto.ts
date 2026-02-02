import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

@ApiSchema({
	name: 'ProfileDto',
	description: '사용자 프로필 조회에 사용되는 DTO',
})
export class ProfileDto {
	@Expose()
	@ApiProperty({ description: '이메일 주소', example: 'user@example.com' })
	@IsEmail()
	email!: string;

	@Expose()
	@ApiProperty({ description: '사용자 이름', example: '홍길동' })
	@IsString()
	username!: string;

	@Expose()
	@ApiProperty({
		description: '프로필 이미지 URL',
		nullable: true,
		example: 'https://example.com/profile.jpg',
	})
	@IsString()
	@IsOptional()
	profileImage!: string | null;

	@Expose()
	@ApiProperty({ description: '사용자 레벨', example: 1 })
	@IsNumber()
	level!: number;

	@Expose()
	@ApiProperty({
		description: 'Google OAuth ID',
		nullable: true,
		example: null,
	})
	@IsString()
	@IsOptional()
	googleId!: string | null;

	@Expose()
	@ApiProperty({
		description: 'GitHub OAuth ID',
		nullable: true,
		example: null,
	})
	@IsString()
	@IsOptional()
	githubId!: string | null;
}
