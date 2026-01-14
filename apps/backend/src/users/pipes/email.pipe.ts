import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class EmailPipe implements PipeTransform {
	transform(value: any, _: ArgumentMetadata) {
		const email = value.toString();

		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

		if (!emailRegex.test(email)) {
			throw new BadRequestException('올바른 이메일 형식이 아닙니다');
		}

		return email;
	}
}
