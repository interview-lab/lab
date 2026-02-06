import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose, Type as TransformType } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class RegistrationTypeDto {
	@Expose()
	@ApiProperty({
		description: '등록 타입',
		example: 'EMAIL',
		enum: ['EMAIL', 'GOOGLE', 'GITHUB'],
	})
	@IsString()
	type!: string;

	@Expose()
	@ApiProperty({
		description: '기본 가입 수단 여부',
		example: true,
	})
	@IsBoolean()
	isDefault!: boolean;
}

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
		description: '등록된 인증 방법 목록',
		type: [RegistrationTypeDto],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@TransformType(() => RegistrationTypeDto)
	registrationTypes!: RegistrationTypeDto[];
}
