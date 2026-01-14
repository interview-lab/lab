import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { EmailService } from '@/email/email.service';
import { UsersService } from '@/users/users.service';
import { AuthService } from './auth.service';
import { SendVerificationDto, VerifyCodeDto } from './dtos/email-verify.dto';
import { OAuthCompleteDto } from './dtos/oauth-complete.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { AccessTokenGuard, RefreshTokenGuard } from './guards/token.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly emailService: EmailService,
		private readonly usersService: UsersService,
	) {}

	// ===== Email/Password =====

	/**
	 * 이메일과 비밀번호를 사용하여 로그인합니다.
	 */
	@Post('login/email')
	loginEmail(@Body('email') email: string, @Body('password') password: string) {
		return this.authService.loginWithEmail({ email, password });
	}

	/**
	 * 이메일과 비밀번호를 사용하여 회원가입합니다.
	 */
	@Post('register/email')
	registerEmail(
		@Body('email') email: string,
		@Body('password') password: string,
		@Body('username') username: string,
	) {
		return this.authService.registerWithEmail({ email, password, username });
	}

	// ===== Token 재발급 =====

	/**
	 * Refresh Token을 사용하여 Access Token을 재발급합니다.
	 */
	@Post('token/access')
	@UseGuards(RefreshTokenGuard)
	refreshAccessToken(@Headers('Authorization') rawToken: string) {
		const token = this.authService.extractTokenFromHeader(rawToken);

		const newAccessToken = this.authService.rotateToken(token);

		return {
			accessToken: newAccessToken,
		};
	}

	/**
	 * Refresh Token을 사용하여 Refresh Token을 재발급합니다.
	 */
	@Post('token/refresh')
	@UseGuards(RefreshTokenGuard)
	refreshRefreshToken(@Headers('Authorization') rawToken: string) {
		const token = this.authService.extractTokenFromHeader(rawToken);

		const newRefreshToken = this.authService.rotateToken(token, true);

		return {
			refreshToken: newRefreshToken,
		};
	}

	// ===== Google OAuth =====

	/**
	 * Google OAuth 로그인을 시작합니다.
	 */
	@Get('google')
	@UseGuards(GoogleOAuthGuard)
	googleLogin() {
		// Passport가 Google로 리다이렉트
	}

	/**
	 * Google OAuth 콜백을 처리합니다.
	 */
	@Get('google/callback')
	@UseGuards(GoogleOAuthGuard)
	async googleCallback(
		@Req() req: {
			user: {
				googleId: string;
				email?: string;
				name?: string;
				profileImage?: string;
			};
		},
		@Res() res: Response,
	) {
		const profile = {
			provider: 'google' as const,
			providerId: req.user.googleId,
			email: req.user.email,
			name: req.user.name,
			profileImage: req.user.profileImage,
		};

		const result = await this.authService.handleOAuthCallback(profile);

		// 프론트엔드로 리다이렉트
		const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

		if (result.isExistingUser) {
			// 기존 사용자: 토큰과 함께 리다이렉트
			return res.redirect(
				`${frontendUrl}/auth/callback?` +
					`accessToken=${result.accessToken}&` +
					`refreshToken=${result.refreshToken}`,
			);
		}

		// 신규 사용자: 가입 완료 페이지로 리다이렉트
		return res.redirect(
			`${frontendUrl}/auth/complete-signup?` +
				`tempToken=${result.tempToken}&` +
				`email=${encodeURIComponent(result.providerEmail || '')}&` +
				`name=${encodeURIComponent(result.providerName || '')}`,
		);
	}

	/**
	 * OAuth 가입을 완료합니다.
	 */
	@Post('oauth/complete')
	async completeOAuthRegistration(@Body() dto: OAuthCompleteDto) {
		// 이메일 인증 확인
		await this.emailService.verifyCode(dto.email, dto.verificationCode);

		// 가입 완료
		return this.authService.completeOAuthRegistration(
			dto.tempToken,
			dto.username,
			dto.email,
		);
	}

	/**
	 * Google 계정 연동을 해제합니다.
	 */
	@Delete('oauth/unlink/google')
	@UseGuards(AccessTokenGuard)
	async unlinkGoogleAccount(@Req() req: { user: { id: number } }) {
		await this.usersService.unlinkOAuthAccount(req.user.id, 'google');
		return { message: 'Google 계정 연동이 해제되었습니다.' };
	}

	// ===== Email Verification =====

	/**
	 * 인증 이메일을 발송합니다.
	 */
	@Post('email/send-verification')
	async sendVerification(@Body() dto: SendVerificationDto) {
		await this.emailService.sendVerificationEmail(dto.email);
		return { message: '인증 이메일이 발송되었습니다.' };
	}

	/**
	 * 이메일 인증번호를 확인합니다.
	 */
	@Post('email/verify')
	async verifyEmail(@Body() dto: VerifyCodeDto) {
		await this.emailService.verifyCode(dto.email, dto.code);
		return { message: '이메일 인증이 완료되었습니다.' };
	}
}
