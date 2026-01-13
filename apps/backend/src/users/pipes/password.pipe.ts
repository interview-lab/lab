import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
	transform(value: any, _: ArgumentMetadata) {
		const password = value.toString();

		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

		if (!passwordRegex.test(password)) {
			throw new BadRequestException(
				'비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다',
			);
		}
		return password;
	}
}
