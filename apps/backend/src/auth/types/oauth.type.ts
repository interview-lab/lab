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
export interface OAuthCallbackResult {
	isExistingUser: boolean;
	// 기존 사용자인 경우
	accessToken?: string;
	refreshToken?: string;
	// 신규 사용자인 경우
	tempToken?: string;
	providerEmail?: string;
	providerName?: string;
}
