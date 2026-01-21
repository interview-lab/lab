const MESSAGE = {
	ERROR_USERNAME_LENGTH: '이름은 3자 이상이어야 합니다.',
	ERROR_PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
	ERROR_PASSWORD_PATTERN:
		'비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
	ERROR_EMAIL_LENGTH: '이메일은 3자 이상이어야 합니다.',
	ERROR_EMAIL_PATTERN:
		'이메일은 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
	ERROR_EMAIL_NOT_FOUND: '이메일이 없습니다.',
	ERROR_VERIFICATION_CODE_LENGTH: '인증코드는 6자이어야 합니다.',
} as const;

export default MESSAGE;
