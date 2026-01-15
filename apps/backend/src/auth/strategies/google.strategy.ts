import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

/**
 * Google OAuth 2.0 인증 전략
 *
 * @description Passport.js를 사용한 Google OAuth 인증을 처리합니다.
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			callbackURL: process.env.GOOGLE_CALLBACK_URL ?? '',
			scope: ['email', 'profile'],
		});
	}

	/**
	 * Google 인증 완료 후 호출되는 콜백
	 *
	 * @param _accessToken - Google Access Token (미사용)
	 * @param _refreshToken - Google Refresh Token (미사용)
	 * @param profile - Google 사용자 프로필
	 * @param done - Passport 콜백 함수
	 */
	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	): Promise<void> {
		const { id, emails, displayName, photos } = profile;

		const user = {
			googleId: id,
			email: emails?.[0]?.value,
			name: displayName,
			profileImage: photos?.[0]?.value,
		};

		done(null, user);
	}
}
