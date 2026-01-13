import { Body, Controller, Post } from '@nestjs/common';
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

	// @Post('refresh')
	// refresh() {
	// 	return this.authService.refresh();
	// }
}
