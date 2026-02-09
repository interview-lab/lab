export type Result<E extends { reason: string }, S> = [E, null] | [null, S];

export function ok<S>(value: S): Result<never, S> {
	return [null, value];
}

export function err<const R extends string, E extends { reason: R }>(
	error: E,
): Result<E, never> {
	return [error, null];
}
