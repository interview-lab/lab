export type JWT_ACCESS_TOKEN_Payload = {
	sub: number;
	email: string;
	type: 'access' | 'refresh';
};
