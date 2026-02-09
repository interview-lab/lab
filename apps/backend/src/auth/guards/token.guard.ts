import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import AUTH_MESSAGE from '@/auth/consts/message.const';
import USER_MESSAGE from '@/users/consts/message.const';
import { UsersService } from '@/users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
	constructor(
		protected readonly authService: AuthService,
		protected readonly usersService: UsersService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const rawToken = request.headers.authorization;

		if (!rawToken) {
			throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_NOT_FOUND);
		}

		const [extractTokenError, token] =
			this.authService.extractTokenFromHeader(rawToken);

		if (extractTokenError) {
			throw new UnauthorizedException(extractTokenError.reason);
		}

		const [error, payload] = this.authService.verifyToken(token);

		if (error) {
			throw new UnauthorizedException(error.reason);
		}

		const user = await this.usersService.getUserById(payload.sub);

		if (!user) {
			throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_INVALID);
		}

		request.user = user;
		request.type = payload.type;
		request.token = token;

		return true;
	}
}

@Injectable()
export class AccessTokenGuard extends TokenGuard {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();

		const accessToken = request.cookies?.accessToken;
		const refreshToken = request.cookies?.refreshToken;

		try {
			// accessToken 검증 시도
			const [verifyTokenError, payload] =
				this.authService.verifyToken(accessToken);

			if (verifyTokenError) {
				throw new UnauthorizedException(verifyTokenError.reason);
			}

			if (payload.type !== 'access') {
				throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_INVALID);
			}

			request.user = await this.usersService.getUserById(payload.sub);

			if (!request.user) {
				throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_INVALID);
			}

			return true;
		} catch {
			// accessToken 만료 시 refreshToken으로 갱신 시도
			if (!refreshToken) {
				throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_EXPIRED);
			}

			try {
				// refreshToken 검증
				const [verifyTokenError, refreshPayload] =
					this.authService.verifyToken(refreshToken);

				if (verifyTokenError) {
					throw new UnauthorizedException(verifyTokenError.reason);
				}

				if (refreshPayload.type !== 'refresh') {
					throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_INVALID);
				}

				// 새 토큰 발급
				const user = await this.usersService.getUserById(refreshPayload.sub);

				if (!user) {
					throw new UnauthorizedException(USER_MESSAGE.ERROR_USER_NOT_FOUND);
				}

				const tokens = this.authService.generateToken(user);

				// Cookie에 새 토큰 설정
				this.authService.setTokenToCookie(response, tokens.accessToken);
				this.authService.setTokenToCookie(response, tokens.refreshToken, true);

				request.user = user;
				return true;
			} catch {
				throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_EXPIRED);
			}
		}
	}
}

/**
 * 임시 토큰이 존재하는지 확인합니다.
 *
 * @description OAuth 가입 완료 API에서 사용됩니다.
 */
@Injectable()
export class TempTokenGuard implements CanActivate {
	constructor(protected readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const tempToken = request.headers['x-temp-token'];

		if (!tempToken) {
			throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_NOT_FOUND);
		}

		const [error, pending] =
			await this.authService.getPendingRegistration(tempToken);

		if (error) {
			throw new UnauthorizedException(error.reason);
		}

		if (!pending || Date.now() > pending.expiresAt.getTime()) {
			throw new UnauthorizedException(AUTH_MESSAGE.ERROR_TOKEN_EXPIRED);
		}

		request.tempToken = tempToken;

		return true;
	}
}
