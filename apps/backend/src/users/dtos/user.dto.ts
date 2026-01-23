import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { User } from '@/generated/prisma/client';

@ApiSchema({
	name: 'UserResponseDto',
	description: '사용자 공개 정보 응답 DTO',
})
export class UserResponseDto {
	@ApiProperty({ description: '사용자 ID', example: 1 })
	id!: number;

	@ApiProperty({
		description: '이메일 주소',
		example: 'user@example.com',
	})
	email!: string;

	@ApiProperty({ description: '사용자 닉네임', example: 'BHyeonKim' })
	username!: string;

	@ApiProperty({
		description: '프로필 이미지 URL',
		example: 'https://example.com/profile.jpg',
		nullable: true,
	})
	profileImage!: string | null;

	@ApiProperty({ description: '사용자 레벨', example: 1 })
	level!: number;

	@ApiProperty({ description: 'Google 연동 여부', example: false })
	isGoogleLinked!: boolean;

	@ApiProperty({ description: 'GitHub 연동 여부', example: false })
	isGithubLinked!: boolean;

	@ApiProperty({ description: '가입일' })
	createdAt!: Date;

	static fromUser(user: User): UserResponseDto {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			profileImage: user.profileImage,
			level: user.level,
			isGoogleLinked: !!user.googleId,
			isGithubLinked: !!user.githubId,
			createdAt: user.createdAt,
		};
	}
}
