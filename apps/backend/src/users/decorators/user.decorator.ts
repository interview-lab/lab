import {
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';
import type { User as UserModel } from '@/generated/prisma/client';

export const User = createParamDecorator((_, context: ExecutionContext) => {
	const { user }: { user: UserModel | null } = context
		.switchToHttp()
		.getRequest();

	if (!user) {
		throw new InternalServerErrorException(
			'User Decorator는 AccessTokenGuard와 함께 사용되어야 합니다.',
		);
	}

	return user;
});
