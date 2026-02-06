import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthProvider } from '@/generated/prisma/enums';

@ApiSchema({
	name: 'UnlinkOAuthAccountDto',
	description: 'OAuth 계정 연동 해제 DTO',
})
export class UnlinkOAuthAccountDto {
	@IsString()
	@ApiProperty({
		description: 'OAuth 제공자',
		example: 'GOOGLE',
		enum: ['GOOGLE', 'GITHUB'],
	})
	provider!: Exclude<AuthProvider, 'EMAIL'>;
}
