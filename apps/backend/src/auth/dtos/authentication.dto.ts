import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class EmailAndPasswordDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		{
			message: '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
		},
	)
	password!: string;
}

export class RegistrationWithEmailAndPasswordDto extends EmailAndPasswordDto {
	@IsString()
	@MinLength(2, { message: '이름은 2자 이상이어야 합니다.' })
	username!: string;
}
