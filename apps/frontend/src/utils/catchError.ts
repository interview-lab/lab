function isErrorType<E extends new (message?: string) => Error>(
	error: unknown,
	errorTypes: E[],
): error is InstanceType<E> {
	return errorTypes.some((errorType) => error instanceof errorType);
}

export default async function catchError<
	E extends new (
		message?: string,
	) => Error,
	R,
>(
	promise: Promise<R>,
	errorsToCatch?: E[],
): Promise<[InstanceType<E> | Error, null] | [null, R]> {
	try {
		const result = await promise;
		return [null, result];
	} catch (error) {
		if (errorsToCatch?.length && isErrorType(error, errorsToCatch)) {
			return [error, null];
		}

		if (isErrorType(error, [Error])) {
			return [error, null];
		}

		throw error;
	}
}
