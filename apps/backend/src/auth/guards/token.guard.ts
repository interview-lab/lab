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
		protected readonly authService: AuthService,
		protected readonly usersService: UsersService,
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
export class AccessTokenGuard extends TokenGuard {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();

		const accessToken = request.cookies?.accessToken;
		const refreshToken = request.cookies?.refreshToken;

		// accessToken이 없으면 에러
		if (!accessToken) {
			throw new UnauthorizedException('Access Token이 없습니다.');
		}

		try {
			// accessToken 검증 시도
			const payload = this.authService.verifyToken(accessToken);

			if (payload.type !== 'access') {
				throw new UnauthorizedException('Access Token이 아닙니다.');
			}

			request.user = await this.usersService.getUserById(payload.sub);
			return true;
		} catch {
			// accessToken 만료 시 refreshToken으로 갱신 시도
			if (!refreshToken) {
				throw new UnauthorizedException(
					'토큰이 만료되었습니다. 다시 로그인해주세요.',
				);
			}

			try {
				// refreshToken 검증
				const refreshPayload = this.authService.verifyToken(refreshToken);

				if (refreshPayload.type !== 'refresh') {
					throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
				}

				// 새 토큰 발급
				const user = await this.usersService.getUserById(refreshPayload.sub);

				if (!user) {
					throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
				}

				const tokens = this.authService.generateToken(user);

				// Cookie에 새 토큰 설정
				this.authService.setTokenToCookie(response, tokens.accessToken);
				this.authService.setTokenToCookie(response, tokens.refreshToken, true);

				request.user = user;
				return true;
			} catch {
				throw new UnauthorizedException(
					'토큰이 만료되었습니다. 다시 로그인해주세요.',
				);
			}
		}
	}
}

/**
 * 임시 토큰이 존재하는지 확인합니다.
 */
@Injectable()
export class TempTokenGaurd implements CanActivate {
	constructor(protected readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const tempToken = request.headers['x-temp-token'];

		if (!tempToken) {
			throw new UnauthorizedException('Temp Token이 없습니다.');
		}

		const pending = await this.authService.getPendingRegistration(tempToken);

		if (!pending || Date.now() > pending.expiresAt.getTime()) {
			throw new UnauthorizedException('유효하지 않거나 만료된 요청입니다.');
		}

		return true;
	}
}
