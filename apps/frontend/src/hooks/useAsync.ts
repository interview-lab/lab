import { useCallback, useRef, useState } from 'react';

interface UseAsyncReturn<T> {
	isLoading: boolean;
	error: string;
	execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>;
	reset: () => void;
}

export default function useAsync<T = void>(): UseAsyncReturn<T> {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const isLoadingRef = useRef(false);

	const execute = useCallback(async (asyncFn: () => Promise<T>) => {
		if (isLoadingRef.current) return;

		isLoadingRef.current = true;
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
			isLoadingRef.current = false;
			setIsLoading(false);
		}
	}, []);

	const reset = useCallback(() => {
		setError('');
	}, []);

	return { isLoading, error, execute, reset };
}
