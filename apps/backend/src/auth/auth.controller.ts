import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
	refreshAccessToken(@Headers('Authorization') rawToken: string) {
		const token = this.authService.extractTokenFromHeader(rawToken);

		const newAccessToken = this.authService.rotateToken(token);

		return {
			accessToken: newAccessToken,
		};
	}

	@Post('token/refresh')
	refreshRefreshToken(@Headers('Authorization') rawToken: string) {
		const token = this.authService.extractTokenFromHeader(rawToken);

		const newRefreshToken = this.authService.rotateToken(token, true);

		return {
			refreshToken: newRefreshToken,
		};
	}
}
