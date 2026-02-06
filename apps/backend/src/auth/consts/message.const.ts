const MESSAGE = {
	ERROR_EMAIL_PASSWORD_NOT_MATCH: '이메일 또는 비밀번호가 일치하지 않습니다.',

	ERROR_USERNAME_LENGTH: '이름은 3자 이상이어야 합니다.',

	ERROR_EMAIL_LENGTH: '이메일은 3자 이상이어야 합니다.',
	ERROR_EMAIL_PATTERN:
		'이메일은 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
	ERROR_EMAIL_NOT_FOUND: '이메일이 없습니다.',

	ERROR_PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
	ERROR_PASSWORD_PATTERN:
		'비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',

	ERROR_OAUTH_REQUEST_INVALID: '유효하지 않거나 만료된 요청입니다.',
	ERROR_OAUTH_ALREADY_LINKED: '이미 다른 계정에 연결된 OAuth 계정입니다.',
	ERROR_OAUTH_ALREADY_LINKED_TO_USER:
		'이미 이 제공자의 계정이 연결되어 있습니다.',
	ERROR_OAUTH_NOT_LINKED: '연결된 OAuth 계정이 없습니다.',
	ERROR_INITIAL_METHOD_UNLINK: '최초 가입 방법은 해제할 수 없습니다.',

	ERROR_TOKEN_NOT_FOUND: '토큰이 존재하지 않습니다.',
	ERROR_TOKEN_EXPIRED: '토큰이 만료되었습니다.',
	ERROR_TOKEN_INVALID: '유효하지 않은 토큰입니다.',
	ERROR_TOKEN_REFRESH_ONLY: '토큰 재발급은 refresh token만 가능합니다.',
} as const;

export default MESSAGE;
