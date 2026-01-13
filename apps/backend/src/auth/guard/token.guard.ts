import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const rawToken = request.headers.authorization;

		if (!rawToken) {
			throw new UnauthorizedException('토큰이 존재하지 않습니다.');
		}

		const token = this.authService.extractTokenFromHeader(rawToken);
		const { sub, type } = this.authService.verifyToken(token);

		const user = await this.usersService.getUserById(sub);
		request.user = user;
		request.type = type;
		request.token = token;

		return true;
	}
}

@Injectable()
export class RefreshTokenGuard extends TokenGuard {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		super.canActivate(context);

		const request = context.switchToHttp().getRequest();

		if (request.type !== 'refresh') {
			throw new UnauthorizedException('refresh token이 아닙니다.');
		}

		return true;
	}
}
