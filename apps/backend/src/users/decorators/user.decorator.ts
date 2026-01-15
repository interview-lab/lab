import {
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator((_, context: ExecutionContext) => {
	const { user } = context.switchToHttp().getRequest();

	if (!user) {
		throw new InternalServerErrorException(
			'User Decorator는 AccessTokenGuard와 함께 사용되어야 합니다.',
		);
	}

	return user;
});
