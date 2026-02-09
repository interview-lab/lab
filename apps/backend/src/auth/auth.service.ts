import { catchError } from '@interview-lab/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
	HASH_ROUNDS,
	JWT_ACCESS_TOKEN_EXPIRES_IN,
	JWT_REFRESH_TOKEN_EXPIRES_IN,
	JWT_SECRET,
	OAUTH_LINK_INTENT_COOKIE,
	OAUTH_LINK_INTENT_EXPIRES_IN,
} from '@/auth/consts/auth.const';
import AUTH_MESSAGE from '@/auth/consts/message.const';
import { RegistrationWithEmailAndPasswordDto } from '@/auth/dtos/authentication.dto';
import type {
	JWT_TOKEN_Payload,
	OAuthLinkIntentPayload,
} from '@/auth/types/jwt.type';
import type {
	OAuthCallbackResult,
	OAuthProfile,
} from '@/auth/types/oauth.type';
import { MILLI_SECOND, MINUTE } from '@/common/consts/unit';
import EMAIL_MESSAGE from '@/email/consts/message.const';
import { EmailService } from '@/email/email.service';
import { AuthProvider } from '@/generated/prisma/client';
import { UserModel } from '@/generated/prisma/models';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { err, ok, Result } from '@/utils/result';

/**
 * 인증 관련 비즈니스 로직을 처리하는 서비스
 *
 * @description 사용자 등록, 로그인, JWT 토큰 발급 기능을 제공합니다.
 */
@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
	) {}

	/**
	 * 이메일로 신규 사용자를 등록하고 토큰을 발급합니다.
	 * 이메일 인증이 완료되지 않은 경우 예외를 발생시킵니다.
	 *
	 * @param dto - 등록할 사용자 정보 (username, email, password)
	 * @returns Access Token과 Refresh Token을 포함한 객체
	 */
	async registerWithEmail(
		response: Response,
		dto: RegistrationWithEmailAndPasswordDto,
	) {
		const [verifyError, isVerified] = await this.emailService.verifyCode(
			dto.email,
			dto.verificationCode,
		);

		if (verifyError || !isVerified) {
			return err({ reason: EMAIL_MESSAGE.ERROR_VERIFICATION_REQUIRED });
		}

		const hash = await bcrypt.hash(dto.password, HASH_ROUNDS);

		const { verificationCode: _, ...userData } = dto;
		const [error, newUser] = await this.usersService.createUser({
			...userData,
			password: hash,
		});

		if (error) {
			return err(error);
		}

		const tokens = this.generateToken(newUser);

		this.setTokenToCookie(response, tokens.accessToken);
		this.setTokenToCookie(response, tokens.refreshToken, true);

		await this.emailService.deleteVerification(dto.email);

		return ok(null);
	}

	/**
	 * 이메일과 비밀번호로 로그인하여 토큰을 발급합니다.
	 *
	 * @param user - 로그인할 사용자 정보 (email, password)
	 * @returns Access Token과 Refresh Token을 포함한 객체
	 * @throws {UnauthorizedException} 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우
	 */
	async loginWithEmail(
		response: Response,
		user: Pick<UserModel, 'email' | 'password'>,
	) {
		const [error, existingUser] =
			await this.authenticateWithEmailAndPassword(user);

		if (error) {
			return err({ reason: error.reason });
		}

		const tokens = this.generateToken(existingUser);

		this.setTokenToCookie(response, tokens.accessToken);
		this.setTokenToCookie(response, tokens.refreshToken, true);

		return ok(null);
	}

	/**
	 * 사용자 정보로 Access Token과 Refresh Token을 생성합니다.
	 *
	 * @param user - 토큰에 포함할 사용자 정보 (id, email)
	 * @returns accessToken과 refreshToken을 포함한 객체
	 */
	generateToken(user: Pick<UserModel, 'id' | 'email'>) {
		return {
			accessToken: this.signToken(user),
			refreshToken: this.signToken(user, true),
		};
	}

	/**
	 * JWT 토큰을 서명합니다.
	 *
	 * @param user - 토큰에 포함할 사용자 정보 (id, email)
	 * @param isRefreshToken - Refresh Token 여부 (기본값: false)
	 * @returns 서명된 JWT 토큰 문자열
	 */
	private signToken(
		user: Pick<UserModel, 'id' | 'email'>,
		isRefreshToken: boolean = false,
	) {
		const payload = {
			sub: user.id,
			email: user.email,
			type: isRefreshToken ? 'refresh' : 'access',
		};

		return this.jwtService.sign(payload, {
			secret: JWT_SECRET,
			expiresIn: isRefreshToken
				? JWT_REFRESH_TOKEN_EXPIRES_IN
				: JWT_ACCESS_TOKEN_EXPIRES_IN,
		});
	}

	/**
	 * 이메일과 비밀번호로 사용자를 인증합니다.
	 *
	 * @param user - 인증할 사용자 정보 (email, password)
	 * @returns 인증된 사용자 정보
	 * @throws {UnauthorizedException} 사용자가 존재하지 않는 경우
	 * @throws {UnauthorizedException} 비밀번호가 일치하지 않는 경우
	 */
	async authenticateWithEmailAndPassword(
		user: Pick<UserModel, 'email' | 'password'>,
	) {
		const existingUser = await this.usersService.getUserByEmail(user.email);

		if (!existingUser || !existingUser.password) {
			return err({ reason: AUTH_MESSAGE.ERROR_EMAIL_PASSWORD_NOT_MATCH });
		}

		const passwordIdentical = await bcrypt.compare(
			user.password ?? '',
			existingUser.password,
		);

		if (!passwordIdentical) {
			return err({ reason: AUTH_MESSAGE.ERROR_EMAIL_PASSWORD_NOT_MATCH });
		}

		return ok(existingUser);
	}

	/**
	 * 헤더에서 bearer 토큰을 추출합니다.
	 *
	 * @param header - Authorization 헤더
	 * @returns 토큰 문자열
	 * @throws {UnauthorizedException} 토큰이 존재하지 않는 경우
	 */
	extractTokenFromHeader(header: string) {
		const splitToken = header.split(' ');

		if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
			return err({ reason: AUTH_MESSAGE.ERROR_TOKEN_INVALID });
		}

		// biome-ignore lint/style/noNonNullAssertion: <splitToken[1]가 항상 존재함>
		return ok(splitToken[1]!);
	}

	/**
	 * JWT 토큰을 검증합니다.
	 *
	 * @param token - 검증할 JWT 토큰
	 * @returns 토큰의 payload
	 */
	verifyToken(token: string) {
		try {
			const result = this.jwtService.verify<JWT_TOKEN_Payload>(token, {
				secret: JWT_SECRET,
			});
			return ok(result);
		} catch {
			return err({ reason: AUTH_MESSAGE.ERROR_TOKEN_EXPIRED });
		}
	}

	/**
	 * 토큰을 재발급합니다.
	 *
	 * @param token - 재발급할 토큰
	 * @param isRefreshToken - Refresh Token 여부 (기본값: false)
	 * @returns 재발급된 토큰
	 */
	rotateToken(token: string, isRefreshToken: boolean = false) {
		try {
			const decoded = this.jwtService.verify<JWT_TOKEN_Payload>(token, {
				secret: JWT_SECRET,
			});
			if (decoded.type !== 'refresh') {
				return err({ reason: AUTH_MESSAGE.ERROR_TOKEN_REFRESH_ONLY });
			}
			return ok(
				this.signToken({ ...decoded, id: decoded.sub }, isRefreshToken),
			);
		} catch {
			return err({ reason: AUTH_MESSAGE.ERROR_TOKEN_INVALID });
		}
	}

	/**
	 * 임시 토큰을 생성합니다.
	 *
	 * @returns 임시 토큰 문자열
	 */
	generateTempToken() {
		return uuidv4();
	}

	/**
	 * OAuth 콜백을 처리합니다.
	 *
	 * @description 기존 사용자는 바로 JWT를 발급하고,
	 *              신규 사용자는 임시 토큰을 발급하여 추가 정보 입력을 유도합니다.
	 * @param profile - OAuth 프로필 정보
	 * @returns 기존 사용자: JWT 토큰, 신규 사용자: 임시 토큰 및 프로필 정보
	 */
	async handleOAuthCallback(
		profile: OAuthProfile,
	): Promise<Result<{ reason: string }, OAuthCallbackResult>> {
		const { provider, providerId, email, name, profileImage } = profile;

		// 1. 기존 사용자 조회
		const [error, existingUser] = await catchError(
			this.usersService.getUserByOAuthId(provider, providerId),
		);

		if (error) {
			return err({ reason: AUTH_MESSAGE.ERROR_OAUTH_CALLBACK_FAILED });
		}

		if (existingUser) {
			// 기존 사용자 -> 바로 JWT 발급
			const tokens = this.generateToken(existingUser);
			return ok({
				isExistingUser: true,
				...tokens,
			});
		}

		// 2. 신규 사용자 -> 임시 토큰 발급
		const tempToken = this.generateTempToken();
		const expiresAt = new Date(Date.now() + 30 * MINUTE); // 30분

		// 기존 pending 레코드 삭제 후 새로 생성
		const [createError] = await catchError(
			this.prisma.$transaction(async (tx) => {
				await tx.oAuthPendingRegistration.deleteMany({
					where: { provider, providerId },
				});

				await tx.oAuthPendingRegistration.create({
					data: {
						provider,
						providerId,
						tempToken,
						providerEmail: email,
						providerName: name,
						profileImage,
						expiresAt,
					},
				});
			}),
		);

		if (createError) {
			return err({ reason: AUTH_MESSAGE.ERROR_OAUTH_CALLBACK_FAILED });
		}

		return ok({
			isExistingUser: false,
			tempToken,
			providerEmail: email,
			providerName: name,
		});
	}

	/**
	 * 임시 토큰으로 OAuth pending 레코드를 조회합니다.
	 *
	 * @param tempToken - 임시 토큰
	 * @returns OAuth pending 레코드
	 */
	async getPendingRegistration(tempToken: string) {
		const [error, pendingRegistration] = await catchError(
			this.prisma.oAuthPendingRegistration.findFirst({
				where: { tempToken },
			}),
		);

		if (error) {
			return err({ reason: AUTH_MESSAGE.ERROR_TEMP_TOKEN_INVALID });
		}

		return ok(pendingRegistration);
	}

	/**
	 * OAuth 가입을 완료합니다.
	 *
	 * @description 임시 토큰을 검증하고, 이메일 인증을 확인한 후 사용자를 생성합니다.
	 * @param tempToken - OAuth 콜백에서 발급받은 임시 토큰
	 * @param username - 사용자명
	 * @param email - 이메일 주소
	 * @returns Access Token과 Refresh Token을 포함한 객체
	 * @throws {UnauthorizedException} 유효하지 않거나 만료된 임시 토큰인 경우
	 * @throws {BadRequestException} 이메일 인증이 완료되지 않은 경우
	 */
	async completeOAuthRegistration(
		tempToken: string,
		username: string,
		email: string,
	) {
		// 1. pending 레코드 조회
		const [error, pending] = await catchError(
			this.prisma.oAuthPendingRegistration.findFirst({
				where: { tempToken },
				orderBy: {
					createdAt: 'desc',
				},
			}),
		);

		if (error || !pending || pending.expiresAt < new Date()) {
			return err({ reason: AUTH_MESSAGE.ERROR_OAUTH_REQUEST_INVALID });
		}

		// 2~4. 사용자 생성 + pending 삭제 + 이메일 인증 삭제를 트랜잭션으로 처리
		const [txError, newUser] = await catchError(
			this.prisma.$transaction(async (tx) => {
				// 1. 사용자 중복 체크
				const prevUser = await tx.user.findFirst({
					where: {
						OR: [{ email }, { username }],
					},
				});

				if (prevUser) {
					throw new BadRequestException(AUTH_MESSAGE.ERROR_USER_ALREADY_EXISTS);
				}

				// 2. 사용자 생성
				const user = await tx.user.create({
					data: {
						email,
						username,
						profileImage: pending.profileImage,
						registrationTypes: {
							create: {
								type: pending.provider,
								value: pending.providerId,
								isDefault: true,
							},
						},
					},
				});

				// 3. pending 레코드 삭제
				await tx.oAuthPendingRegistration.delete({
					where: { id: pending.id },
				});

				// 4. 이메일 인증 삭제
				await tx.emailVerification.deleteMany({
					where: { email, verified: false },
				});

				return user;
			}),
		);

		if (txError) {
			if (txError instanceof BadRequestException) {
				return err({ reason: txError.message });
			}
			return err({ reason: AUTH_MESSAGE.ERROR_OAUTH_REQUEST_INVALID });
		}

		// 5. JWT 발급
		return ok(this.generateToken(newUser));
	}

	/**
	 * 기존 계정에 OAuth를 연동합니다.
	 *
	 * @param userId - 사용자 ID
	 * @param provider - OAuth 제공자 ('google' | 'github')
	 * @param providerId - OAuth 제공자의 사용자 ID
	 * @throws {BadRequestException} 이미 다른 계정에 연결된 OAuth 계정인 경우
	 */
	async linkOAuthAccount(
		userId: number,
		provider: AuthProvider,
		providerId: string,
	): Promise<void> {
		await this.prisma.$transaction(async (tx) => {
			// 이미 다른 사용자에게 연동된 계정인지 확인
			const existing = await tx.registrationType.findUnique({
				where: { type_value: { type: provider, value: providerId } },
			});
			if (existing) {
				throw new BadRequestException(AUTH_MESSAGE.ERROR_OAUTH_ALREADY_LINKED);
			}

			// 현재 사용자가 이미 해당 제공자를 연동했는지 확인
			const alreadyLinked = await tx.registrationType.findUnique({
				where: { userId_type: { userId, type: provider } },
			});

			if (alreadyLinked) {
				throw new BadRequestException(
					AUTH_MESSAGE.ERROR_OAUTH_ALREADY_LINKED_TO_USER,
				);
			}

			await tx.registrationType.create({
				data: {
					userId,
					type: provider,
					value: providerId,
					isDefault: false,
				},
			});
		});
	}

	/**
	 * 토큰을 쿠키에 저장합니다.
	 *
	 * @param response - 응답 객체
	 * @param token - 저장할 토큰
	 * @param isRefreshToken - Refresh Token 여부 (기본값: false)
	 */
	setTokenToCookie(response: Response, token: string, isRefreshToken = false) {
		const key = isRefreshToken ? 'refreshToken' : 'accessToken';
		const maxAgeInSeconds = isRefreshToken
			? JWT_REFRESH_TOKEN_EXPIRES_IN
			: JWT_ACCESS_TOKEN_EXPIRES_IN;

		response.cookie(key, token, {
			secure: process.env.NODE_ENV === 'production',
			httpOnly: isRefreshToken,
			sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
			maxAge: maxAgeInSeconds * MILLI_SECOND,
		});
	}

	/**
	 * OAuth 연동 의도를 담은 쿠키를 설정합니다.
	 *
	 * @param response - 응답 객체
	 * @param userId - 연동을 요청한 사용자 ID
	 */
	setOAuthLinkIntentCookie(response: Response, userId: number) {
		const payload: OAuthLinkIntentPayload = { mode: 'link', userId };
		const token = this.jwtService.sign(payload, {
			secret: JWT_SECRET,
			expiresIn: OAUTH_LINK_INTENT_EXPIRES_IN,
		});

		response.cookie(OAUTH_LINK_INTENT_COOKIE, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/auth',
			maxAge: OAUTH_LINK_INTENT_EXPIRES_IN * MILLI_SECOND,
		});
	}

	/**
	 * OAuth 연동 의도 쿠키를 검증합니다.
	 *
	 * @param token - 쿠키의 JWT 토큰
	 * @returns 검증된 payload 또는 null (검증 실패 시)
	 */
	verifyOAuthLinkIntent(token: string) {
		try {
			const payload = this.jwtService.verify<OAuthLinkIntentPayload>(token, {
				secret: JWT_SECRET,
			});
			if (payload.mode !== 'link')
				return err({ reason: AUTH_MESSAGE.ERROR_INVALID_OAUTH_LINK_INTENT });

			return ok(payload);
		} catch {
			return err({ reason: AUTH_MESSAGE.ERROR_INVALID_OAUTH_LINK_INTENT });
		}
	}

	/**
	 * OAuth 연동 의도 쿠키를 삭제합니다.
	 *
	 * @param response - 응답 객체
	 */
	clearOAuthLinkIntentCookie(response: Response) {
		response.clearCookie(OAUTH_LINK_INTENT_COOKIE, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/auth',
		});
	}
}
