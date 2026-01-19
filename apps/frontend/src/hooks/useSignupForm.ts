'use client';

import { AUTH } from '@interview-lab/shared';
import { useReducer } from 'react';

type FieldState = {
	value: string;
	touched: boolean;
	isError: boolean;
	errorMessage: string;
};

type FieldName = 'username' | 'email' | 'password' | 'confirmPassword';

type FormState = Record<FieldName, FieldState>;

type ActionChange = {
	type: 'change';
	field: FieldName;
	value: string;
};

type ActionBlur = {
	type: 'blur';
	field: FieldName;
};

type Action = ActionChange | ActionBlur;

const INITIAL_STATE: FormState = {
	username: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
	email: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
	password: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
	confirmPassword: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
};

const ERROR_MESSAGE: Record<FieldName, string> = {
	username: 'Username must be at least 3 characters long',
	email: 'Please enter a valid email address',
	password:
		'Password include at least one uppercase letter, one lowercase letter',
	confirmPassword: 'Passwords do not match',
};

const VALIDATION_RULES = {
	username: (value: string) => value.length >= AUTH.CONST.USERNAME_MIN_LENGTH,
	email: (value: string) => AUTH.CONST.EMAIL_REGEX.test(value),
	password: (value: string) => AUTH.CONST.PASSWORD_REGEX.test(value),
	confirmPassword: (password: string, confirmPassword: string) =>
		password === confirmPassword,
} satisfies Record<FieldName, (...args: string[]) => boolean>;

function validate(field: FieldName, value: string, state: FormState): boolean {
	if (field === 'confirmPassword') {
		return VALIDATION_RULES.confirmPassword(state.password.value, value);
	}
	return VALIDATION_RULES[field](value);
}

function reducer(state: FormState, action: Action): FormState {
	if (action.type === 'change') {
		const updatedState: FormState = {
			...state,
			[action.field]: {
				...state[action.field],
				value: action.value,
			},
		};

		if (state[action.field].touched) {
			const isValid = validate(action.field, action.value, state);
			updatedState[action.field] = {
				...updatedState[action.field],
				isError: !isValid,
				errorMessage: isValid ? '' : ERROR_MESSAGE[action.field],
			};
		}

		if (action.field === 'password' && state.confirmPassword.touched) {
			const isConfirmValid = VALIDATION_RULES.confirmPassword(
				action.value,
				state.confirmPassword.value,
			);
			updatedState.confirmPassword = {
				...updatedState.confirmPassword,
				isError: !isConfirmValid,
				errorMessage: isConfirmValid ? '' : ERROR_MESSAGE.confirmPassword,
			};
		}

		return updatedState;
	}

	if (action.type === 'blur') {
		const value = state[action.field].value;
		const isValid = validate(action.field, value, state);

		return {
			...state,
			[action.field]: {
				...state[action.field],
				touched: true,
				isError: !isValid,
				errorMessage: isValid ? '' : ERROR_MESSAGE[action.field],
			},
		};
	}

	return state;
}

export function useSignupForm() {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	return [state, dispatch] as const;
}
