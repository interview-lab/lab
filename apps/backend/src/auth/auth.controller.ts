import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { EmailService } from '@/email/email.service';
import { UsersService } from '@/users/users.service';
import { AuthService } from './auth.service';
import {
	EmailAndPasswordDto,
	RegistrationWithEmailAndPasswordDto,
} from './dtos/authentication.dto';
import { SendVerificationDto } from './dtos/email-verify.dto';
import { OAuthCompleteDto } from './dtos/oauth-complete.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { AccessTokenGuard, TempTokenGuard } from './guards/token.guard';

@Controller('auth')
@ApiTags('인증')
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
	@ApiOperation({
		summary: '이메일 로그인 API',
		description: '이메일과 비밀번호를 사용하여 로그인합니다.',
	})
	async loginEmail(
		@Body() dto: EmailAndPasswordDto,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.authService.loginWithEmail(response, dto);
	}

	/**
	 * 이메일과 비밀번호를 사용하여 회원가입합니다.
	 */
	@Post('register/email')
	@ApiOperation({
		summary: '이메일 회원가입 API',
		description: '이메일과 비밀번호를 사용하여 회원가입합니다.',
	})
	async registerEmail(
		@Body() dto: RegistrationWithEmailAndPasswordDto,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.authService.registerWithEmail(response, dto);
	}

	// ===== Google OAuth =====

	/**
	 * Google OAuth 로그인을 시작합니다.
	 */
	@Get('google')
	@UseGuards(GoogleOAuthGuard)
	@ApiOperation({
		summary: 'Google OAuth 로그인 API',
		description: 'Google OAuth 로그인을 시작합니다.',
	})
	googleLogin() {
		// Passport가 Google로 리다이렉트
	}

	/**
	 * Google OAuth 콜백을 처리합니다.
	 */
	@Get('google/callback')
	@UseGuards(GoogleOAuthGuard)
	@ApiOperation({
		summary: 'Google OAuth 콜백 API',
		description: 'Google OAuth 콜백을 처리합니다.',
	})
	async googleCallback(
		@Req() req: {
			user: {
				googleId: string;
				email?: string;
				name?: string;
				profileImage?: string;
			};
		},
		@Res() response: Response,
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
			this.authService.setTokenToCookie(response, result.accessToken);
			this.authService.setTokenToCookie(response, result.refreshToken, true);
			return response.redirect(`${frontendUrl}/`);
		}

		// 신규 사용자: 가입 완료 페이지로 리다이렉트
		return response.redirect(
			`${frontendUrl}/additional-info` +
				`?tempToken=${result.tempToken}&` +
				`email=${encodeURIComponent(result.providerEmail || '')}&` +
				`name=${encodeURIComponent(result.providerName || '')}`,
		);
	}

	/**
	 * OAuth 가입을 완료합니다.
	 */
	@Post('oauth/complete')
	@UseGuards(TempTokenGuard)
	@ApiOperation({
		summary: 'OAuth 가입 완료 API',
		description: 'OAuth 가입을 완료합니다.',
	})
	async completeOAuthRegistration(
		@Body() dto: OAuthCompleteDto,
		@Req() request: {
			tempToken: string;
		},
		@Res({ passthrough: true }) response: Response,
	) {
		// 이메일 인증 확인
		await this.emailService.verifyCode(dto.email, dto.verificationCode);

		// 가입 완료
		const tokens = await this.authService.completeOAuthRegistration(
			request.tempToken,
			dto.username,
			dto.email,
		);

		this.authService.setTokenToCookie(response, tokens.accessToken);
		this.authService.setTokenToCookie(response, tokens.refreshToken, true);
		return { message: 'Registration completed' };
	}

	/**
	 * Google 계정 연동을 해제합니다.
	 */
	@Delete('oauth/unlink/google')
	@UseGuards(AccessTokenGuard)
	@ApiOperation({
		summary: 'Google 계정 연동 해제 API',
		description: 'Google 계정 연동을 해제합니다.',
	})
	async unlinkGoogleAccount(@Req() req: { user: { id: number } }) {
		await this.usersService.unlinkOAuthAccount(req.user.id, 'google');
		return { message: 'Google 계정 연동이 해제되었습니다.' };
	}

	// ===== Email Verification =====

	/**
	 * 인증 이메일을 발송합니다.
	 */
	@Post('email/send-verification')
	@ApiOperation({
		summary: '인증 이메일 발송 API',
		description: '인증 이메일을 발송합니다.',
	})
	async sendVerification(@Body() dto: SendVerificationDto) {
		const verification = await this.emailService.getVerificationInfo(dto.email);

		const date = new Date();

		if (verification && verification.expiresAt.getTime() > date.getTime()) {
			return {
				message: '이미 인증 이메일이 발송되었습니다.',
				remainingTime: Math.floor(
					(verification.expiresAt.getTime() - date.getTime()) / 1000,
				),
			};
		}

		await this.emailService.sendVerificationEmail(dto.email);
		return { message: '인증 이메일이 발송되었습니다.' };
	}
}
