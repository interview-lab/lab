import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guard/token.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login/email')
	loginEmail(@Body('email') email: string, @Body('password') password: string) {
		return this.authService.loginWithEmail({ email, password });
	}

	@Post('register/email')
	registerEmail(
		@Body('email') email: string,
		@Body('password') password: string,
		@Body('username') username: string,
	) {
		return this.authService.registerWithEmail({ email, password, username });
	}

	@Post('token/access')
	@UseGuards(RefreshTokenGuard)
	refreshAccessToken(@Headers('Authorization') rawToken: string) {
		const token = this.authService.extractTokenFromHeader(rawToken);

		const newAccessToken = this.authService.rotateToken(token);

		return {
			accessToken: newAccessToken,
		};
	}

	@Post('token/refresh')
	@UseGuards(RefreshTokenGuard)
	refreshRefreshToken(@Headers('Authorization') rawToken: string) {
		const token = this.authService.extractTokenFromHeader(rawToken);

		const newRefreshToken = this.authService.rotateToken(token, true);

		return {
			refreshToken: newRefreshToken,
		};
	}
}
