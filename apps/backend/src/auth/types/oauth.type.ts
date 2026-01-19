/**
 * OAuth 제공자 타입
 */
export type OAuthProvider = 'google' | 'github';

/**
 * OAuth 프로필 정보
 */
export interface OAuthProfile {
	provider: OAuthProvider;
	providerId: string;
	email?: string;
	name?: string;
	profileImage?: string;
}

/**
 * OAuth 콜백 결과
 */
export type OAuthCallbackResult =
	| OAuthCallBackExistingUser
	| OAuthCallBackNewUser;

type OAuthCallBackExistingUser = {
	isExistingUser: true;
	accessToken: string;
	refreshToken: string;
};

type OAuthCallBackNewUser = {
	isExistingUser: false;
	tempToken: string;
	providerEmail?: string;
	providerName?: string;
};
