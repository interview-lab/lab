export class TokenNotFoundError extends Error {
	constructor() {
		super('토큰을 찾을 수 없습니다.');

		this.name = 'TokenNotFoundError';
	}
}
