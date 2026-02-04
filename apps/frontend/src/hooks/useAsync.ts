import { useCallback, useRef, useState } from 'react';
import catchError from '@/utils/catchError';

interface UseAsyncReturn<T> {
	isLoading: boolean;
	error: Error | null;
	execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>;
	reset: () => void;
}

/**
 * 비동기 작업을 관리하는 훅
 * @returns 비동기 작업 상태와 실행 함수
 */
export default function useAsync<T = void>(): UseAsyncReturn<T> {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const isLoadingRef = useRef(false);

	const execute = useCallback(async (asyncFn: () => Promise<T>) => {
		if (isLoadingRef.current) return;

		isLoadingRef.current = true;
		setIsLoading(true);
		setError(null);

		const [error, result] = await catchError(asyncFn());

		isLoadingRef.current = false;
		setIsLoading(false);

		if (error) {
			setError(error);
			return;
		}

		return result;
	}, []);

	const reset = useCallback(() => {
		setError(null);
	}, []);

	return { isLoading, error, execute, reset };
}
