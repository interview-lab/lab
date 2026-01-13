import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from '@/generated/prisma/models';
import { UsersService } from '@/users/users.service';
import {
	HASH_ROUNDS,
	JWT_ACCESS_TOKEN_EXPIRES_IN,
	JWT_REFRESH_TOKEN_EXPIRES_IN,
	JWT_SECRET,
} from './const/auth.const';
import { JWT_ACCESS_TOKEN_Payload } from './type/jwt.type';

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
	) {}

	/**
	 * 이메일로 신규 사용자를 등록하고 토큰을 발급합니다.
	 *
	 * @param user - 등록할 사용자 정보 (username, email, password)
	 * @returns Access Token과 Refresh Token을 포함한 객체
	 */
	async registerWithEmail(
		user: Pick<UserModel, 'username' | 'email' | 'password'>,
	) {
		const hash = await bcrypt.hash(user.password ?? '', HASH_ROUNDS);

		const newUser = await this.usersService.createUser({
			...user,
			password: hash,
		});

		return this.loginUser(newUser);
	}

	/**
	 * 이메일과 비밀번호로 로그인하여 토큰을 발급합니다.
	 *
	 * @param user - 로그인할 사용자 정보 (email, password)
	 * @returns Access Token과 Refresh Token을 포함한 객체
	 * @throws {UnauthorizedException} 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우
	 */
	async loginWithEmail(user: Pick<UserModel, 'email' | 'password'>) {
		const existingUser = await this.authenticateWithEmailAndPassword(user);

		return this.loginUser(existingUser);
	}

	/**
	 * 사용자 정보로 Access Token과 Refresh Token을 생성합니다.
	 *
	 * @param user - 토큰에 포함할 사용자 정보 (id, email)
	 * @returns accessToken과 refreshToken을 포함한 객체
	 */
	loginUser(user: Pick<UserModel, 'id' | 'email'>) {
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

		if (!existingUser) {
			throw new UnauthorizedException('존재하지 않는 사용자입니다.');
		}

		const passwordIdentical = await bcrypt.compare(
			user.password ?? '',
			existingUser.password ?? '',
		);

		if (!passwordIdentical) {
			throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
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
		return this.jwtService.verify<JWT_ACCESS_TOKEN_Payload>(token, {
			secret: JWT_SECRET,
		});
	}

	/**
	 * 토큰을 재발급합니다.
	 *
	 * @param token - 재발급할 토큰
	 * @param isRefreshToken - Refresh Token 여부 (기본값: false)
	 * @returns 재발급된 토큰
	 */
	rotateToken(token: string, isRefreshToken: boolean = false) {
		const decoded = this.jwtService.verify<JWT_ACCESS_TOKEN_Payload>(token, {
			secret: JWT_SECRET,
		});

		if (decoded.type !== 'refresh') {
			throw new UnauthorizedException(
				'토큰 재발급은 refresh token만 가능합니다.',
			);
		}

		return this.signToken({ ...decoded, id: decoded.sub }, isRefreshToken);
	}
}
