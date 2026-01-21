import { useCallback, useState } from 'react';

interface UseAsyncReturn<T> {
	isLoading: boolean;
	error: string;
	execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>;
	reset: () => void;
}

export default function useAsync<T = void>(): UseAsyncReturn<T> {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const execute = useCallback(
		async (asyncFn: () => Promise<T>) => {
			if (isLoading) return;

			setIsLoading(true);
			setError('');
			try {
				const result = await asyncFn();
				return result;
			} catch (e) {
				if (e instanceof Error) {
					setError(e.message);
				}
				return undefined;
			} finally {
				setIsLoading(false);
			}
		},
		[isLoading],
	);

	const reset = useCallback(() => {
		setError('');
	}, []);

	return { isLoading, error, execute, reset };
}
