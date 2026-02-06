export type JWT_TOKEN_Payload = {
	sub: number;
	email: string;
	type: 'access' | 'refresh';
};

export type OAuthLinkIntentPayload = {
	mode: 'link';
	userId: number;
};
