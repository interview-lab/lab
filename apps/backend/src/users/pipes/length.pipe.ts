import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class MinLengthPipe implements PipeTransform {
	constructor(private readonly length: number) {}

	transform(value: any, _: ArgumentMetadata) {
		const str = value.toString();

		if (str.length < this.length) {
			throw new Error(
				`값이 너무 짧습니다. 최소 ${this.length}자 이상으로 입력해주세요.`,
			);
		}
		return str;
	}
}

export class MaxLengthPipe implements PipeTransform {
	constructor(private readonly length: number) {}

	transform(value: any, _: ArgumentMetadata) {
		const str = value.toString();

		if (str.length > this.length) {
			throw new Error(
				`값이 너무 깁니다. 최대 ${this.length}자 이하로 입력해주세요.`,
			);
		}
		return str;
	}
}
