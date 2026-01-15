import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

@ApiSchema({
	name: 'EmailAndPasswordDto',
	description: '이메일과 비밀번호로 로그인시 사용되는 DTO',
})
export class EmailAndPasswordDto {
	@IsEmail()
	@ApiProperty({
		description: '이메일 주소',
		example: 'test@example.com',
	})
	email!: string;

	@IsString()
	@ApiProperty({
		description: ' 대문자, 소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호',
		example: 'test1234!',
	})
	@MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		{
			message: '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
		},
	)
	password!: string;
}

@ApiSchema({
	name: 'RegistrationWithEmailAndPasswordDto',
	description: '이메일과 비밀번호로 회원가입시 사용되는 DTO',
})
export class RegistrationWithEmailAndPasswordDto extends EmailAndPasswordDto {
	@IsString()
	@ApiProperty({
		description: '이름',
		example: 'test',
	})
	@MinLength(2, { message: '이름은 2자 이상이어야 합니다.' })
	username!: string;
}
