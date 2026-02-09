import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { OAUTH_LINK_INTENT_COOKIE } from '@/auth/consts/auth.const';
import {
	EmailAndPasswordDto,
	RegistrationWithEmailAndPasswordDto,
} from '@/auth/dtos/authentication.dto';
import { OAuthCompleteDto } from '@/auth/dtos/oauth-complete.dto';
import { GoogleOAuthGuard } from '@/auth/guards/google-oauth.guard';
import { AccessTokenGuard, TempTokenGuard } from '@/auth/guards/token.guard';
import { EmailService } from '@/email/email.service';
import { AuthProvider } from '@/generated/prisma/enums';
import { UsersService } from '@/users/users.service';
import { OAuthProfile } from './types/oauth.type';

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
		const [error] = await this.authService.loginWithEmail(response, dto);

		if (error) {
			throw new BadRequestException(error.reason);
		}
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
		const [error] = await this.authService.registerWithEmail(response, dto);

		if (error) {
			throw new BadRequestException(error.reason);
		}
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
		@Req()
		req: Request & {
			user: {
				providerId: string;
				email?: string;
				name?: string;
				profileImage?: string;
			};
		},
		@Res() response: Response,
	) {
		const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

		// 연동 요청 쿠키 확인
		const linkIntentToken = req.cookies?.[OAUTH_LINK_INTENT_COOKIE] as
			| string
			| undefined;

		if (linkIntentToken) {
			// 항상 쿠키 먼저 삭제 (replay 방지)
			this.authService.clearOAuthLinkIntentCookie(response);

			const [error, intent] =
				this.authService.verifyOAuthLinkIntent(linkIntentToken);

			if (error || !intent) {
				return response.redirect(`${frontendUrl}/setting?error=link_expired`);
			}

			try {
				await this.authService.linkOAuthAccount(
					intent.userId,
					AuthProvider.GOOGLE,
					req.user.providerId,
				);
				return response.redirect(`${frontendUrl}/setting?linked=google`);
			} catch {
				return response.redirect(`${frontendUrl}/setting?error=already_linked`);
			}
		}

		// 기존 로그인/회원가입 플로우
		const profile: OAuthProfile = {
			provider: AuthProvider.GOOGLE,
			providerId: req.user.providerId,
			email: req.user.email,
			name: req.user.name,
			profileImage: req.user.profileImage,
		};

		const [error, result] = await this.authService.handleOAuthCallback(profile);

		if (error || !result) {
			throw new BadRequestException(error.reason);
		}

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
	@ApiHeader({
		name: 'x-temp-token',
		required: true,
	})
	async completeOAuthRegistration(
		@Body() dto: OAuthCompleteDto,
		@Req() request: {
			tempToken: string;
		},
		@Res({ passthrough: true }) response: Response,
	) {
		// 이메일 인증 확인
		const [verifyError] = await this.emailService.verifyCode(
			dto.email,
			dto.verificationCode,
		);

		if (verifyError) {
			throw new BadRequestException(verifyError.reason);
		}

		// 가입 완료
		const [error, tokens] = await this.authService.completeOAuthRegistration(
			request.tempToken,
			dto.username,
			dto.email,
		);

		if (error || !tokens) {
			throw new BadRequestException(error.reason);
		}

		this.authService.setTokenToCookie(response, tokens.accessToken);
		this.authService.setTokenToCookie(response, tokens.refreshToken, true);
		return { message: 'Registration completed' };
	}

	/**
	 * 소셜 계정 연동을 시작합니다.
	 * 인증된 사용자만 사용할 수 있으며, 연동 의도를 쿠키에 저장한 후 소셜 OAuth 플로우를 시작합니다.
	 */
	@Get('oauth/link/:provider')
	@UseGuards(AccessTokenGuard)
	@ApiOperation({
		summary: '소셜 계정 연동 API',
		description: '인증된 사용자의 소셜 계정 연동을 시작합니다.',
	})
	@ApiParam({
		name: 'provider',
		enum: ['GOOGLE', 'GITHUB'],
	})
	LinkOAuth(
		@Req() req: { user: { id: number } },
		@Res() response: Response,
		@Param('provider') provider: Exclude<AuthProvider, 'EMAIL'>,
	) {
		this.authService.setOAuthLinkIntentCookie(response, req.user.id);
		return response.redirect(`/auth/${provider.toLowerCase()}`);
	}

	/**
	 * 소셜 계정 연동을 해제합니다.
	 */
	@Delete('oauth/unlink/:provider')
	@UseGuards(AccessTokenGuard)
	@ApiOperation({
		summary: '소셜 계정 연동 해제 API',
		description: '소셜 계정 연동을 해제합니다.',
	})
	@ApiParam({
		name: 'provider',
		enum: ['GOOGLE', 'GITHUB'],
	})
	async unlinkOAuthAccount(
		@Req() req: { user: { id: number } },
		@Param('provider') provider: Exclude<AuthProvider, 'EMAIL'>,
	) {
		await this.usersService.unlinkOAuthAccount(req.user.id, provider);
		return { message: `${provider} 계정 연동이 해제되었습니다.` };
	}
}
