import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MILLI_SECOND, MINUTE } from '@/common/consts/unit';
import { EmailService } from '@/email/email.service';
import { UserModel } from '@/generated/prisma/models';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import {
	HASH_ROUNDS,
	JWT_ACCESS_TOKEN_EXPIRES_IN,
	JWT_REFRESH_TOKEN_EXPIRES_IN,
	JWT_SECRET,
} from './consts/auth.const';
import { RegistrationWithEmailAndPasswordDto } from './dtos/authentication.dto';
import { JWT_TOKEN_Payload } from './types/jwt.type';
import type { OAuthCallbackResult, OAuthProfile } from './types/oauth.type';

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
		if (!dto.password) {
			throw new BadRequestException('비밀번호가 없습니다.');
		}

		const isVerified = await this.emailService.verifyCode(
			dto.email,
			dto.verificationCode,
		);

		if (!isVerified) {
			throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');
		}

		const hash = await bcrypt.hash(dto.password, HASH_ROUNDS);

		const newUser = await this.usersService.createUser({
			...dto,
			password: hash,
		});

		const tokens = this.generateToken(newUser);

		this.setTokenToCookie(response, tokens.accessToken);
		this.setTokenToCookie(response, tokens.refreshToken, true);
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
		const existingUser = await this.authenticateWithEmailAndPassword(user);

		const tokens = this.generateToken(existingUser);

		this.setTokenToCookie(response, tokens.accessToken);
		this.setTokenToCookie(response, tokens.refreshToken, true);
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
			throw new UnauthorizedException(
				'이메일 또는 비밀번호가 일치하지 않습니다.',
			);
		}

		const passwordIdentical = await bcrypt.compare(
			user.password ?? '',
			existingUser.password,
		);

		if (!passwordIdentical) {
			throw new UnauthorizedException(
				'이메일 또는 비밀번호가 일치하지 않습니다.',
			);
		}

		return existingUser;
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
			throw new UnauthorizedException('잘못된 토큰입니다.');
		}

		// biome-ignore lint/style/noNonNullAssertion: <splitToken[1]가 항상 존재함>
		return splitToken[1]!;
	}

	/**
	 * JWT 토큰을 검증합니다.
	 *
	 * @param token - 검증할 JWT 토큰
	 * @returns 토큰의 payload
	 */
	verifyToken(token: string) {
		try {
			return this.jwtService.verify<JWT_TOKEN_Payload>(token, {
				secret: JWT_SECRET,
			});
		} catch (_) {
			throw new UnauthorizedException('토큰이 만료되었거나 유효하지 않습니다.');
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
		const decoded = this.jwtService.verify<JWT_TOKEN_Payload>(token, {
			secret: JWT_SECRET,
		});

		if (decoded.type !== 'refresh') {
			throw new UnauthorizedException(
				'토큰 재발급은 refresh token만 가능합니다.',
			);
		}

		return this.signToken({ ...decoded, id: decoded.sub }, isRefreshToken);
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
	): Promise<OAuthCallbackResult> {
		const { provider, providerId, email, name, profileImage } = profile;

		// 1. 기존 사용자 조회
		const existingUser = await this.usersService.getUserByOAuthId(
			provider,
			providerId,
		);

		if (existingUser) {
			// 기존 사용자 -> 바로 JWT 발급
			const tokens = this.generateToken(existingUser);
			return {
				isExistingUser: true,
				...tokens,
			};
		}

		// 2. 신규 사용자 -> 임시 토큰 발급
		const tempToken = this.generateTempToken();
		const expiresAt = new Date(Date.now() + 30 * MINUTE); // 30분

		// 기존 pending 레코드 삭제 후 새로 생성
		await this.prisma.oAuthPendingRegistration.deleteMany({
			where: { provider, providerId },
		});

		await this.prisma.oAuthPendingRegistration.create({
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

		return {
			isExistingUser: false,
			tempToken,
			providerEmail: email,
			providerName: name,
		};
	}

	async getPendingRegistration(tempToken: string) {
		return await this.prisma.oAuthPendingRegistration.findFirst({
			where: { tempToken },
		});
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
	): Promise<{ accessToken: string; refreshToken: string }> {
		// 1. pending 레코드 조회
		const pending = await this.prisma.oAuthPendingRegistration.findUnique({
			where: { tempToken },
		});

		if (!pending || pending.expiresAt < new Date()) {
			throw new UnauthorizedException('유효하지 않거나 만료된 요청입니다.');
		}

		// 2. 이메일 인증 확인
		const isVerified = await this.emailService.isEmailVerified(email);
		if (!isVerified) {
			throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');
		}

		// 3. 사용자 생성
		const userData: Parameters<typeof this.usersService.createUser>[0] = {
			email,
			username,
			profileImage: pending.profileImage,
		};

		if (pending.provider === 'google') {
			userData.googleId = pending.providerId;
		} else if (pending.provider === 'github') {
			userData.githubId = pending.providerId;
		}

		const newUser = await this.usersService.createUser(userData);

		// 4. pending 레코드 삭제
		await this.prisma.oAuthPendingRegistration.delete({
			where: { id: pending.id },
		});

		// 5. JWT 발급
		return this.generateToken(newUser);
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
		provider: 'google' | 'github',
		providerId: string,
	): Promise<void> {
		// 이미 연동된 계정인지 확인
		const existing = await this.usersService.getUserByOAuthId(
			provider,
			providerId,
		);
		if (existing) {
			throw new BadRequestException(
				'이미 다른 계정에 연결된 OAuth 계정입니다.',
			);
		}

		await this.usersService.linkOAuthAccount(userId, provider, providerId);
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
}
