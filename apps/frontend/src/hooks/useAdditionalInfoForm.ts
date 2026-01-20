'use client';

import { AUTH } from '@interview-lab/shared';
import { useReducer } from 'react';

type FieldState = {
	value: string;
	touched: boolean;
	isError: boolean;
	errorMessage: string;
};

type FieldName = 'username' | 'email' | 'verificationCode';

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
	email: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
	username: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
	verificationCode: {
		value: '',
		touched: false,
		isError: false,
		errorMessage: '',
	},
};

const ERROR_MESSAGE: Record<FieldName, string> = {
	email: 'Please enter a valid email address',
	username: 'Username Must be at least 3 characters long',
	verificationCode: 'Verification code is 6 digits',
};

const VALIDATION_RULES = {
	email: (value: string) => AUTH.CONST.EMAIL_REGEX.test(value),
	username: (value: string) => value.length >= AUTH.CONST.USERNAME_MIN_LENGTH,
	verificationCode: (value: string) =>
		value.length === AUTH.CONST.VERIFICATION_CODE_LENGTH && /^\d+$/.test(value),
} satisfies Record<FieldName, (value: string) => boolean>;

function validate(field: FieldName, value: string): boolean {
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
			const isValid = validate(action.field, action.value);

			updatedState[action.field] = {
				...updatedState[action.field],
				isError: !isValid,
				errorMessage: isValid ? '' : ERROR_MESSAGE[action.field],
			};
		}

		return updatedState;
	}

	if (action.type === 'blur') {
		const value = state[action.field].value;
		const isValid = validate(action.field, value);

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

export default function useAdditionalInfoForm() {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	return [state, dispatch] as const;
}
