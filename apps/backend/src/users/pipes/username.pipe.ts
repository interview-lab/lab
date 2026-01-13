import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UsernamePipe implements PipeTransform {
	transform(value: any, _: ArgumentMetadata) {
		const username = value.toString();

		if (username.length < 2) {
			throw new Error('사용자 이름은 2자 이상이어야 합니다.');
		}

		return username;
	}
}
