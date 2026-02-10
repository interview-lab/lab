import { catchError } from '@interview-lab/shared';
import { useCallback, useRef, useState } from 'react';

interface UseAsyncReturn {
	isLoading: boolean;
	error: Error | null;
	execute: <T>(asyncFn: () => Promise<T>) => Promise<T | undefined>;
	reset: () => void;
}

/**
 * 비동기 작업을 관리하는 훅
 * @returns 비동기 작업 상태와 실행 함수
 */
export default function useAsync(): UseAsyncReturn {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const isLoadingRef = useRef(false);

	const execute = useCallback(async <T>(asyncFn: () => Promise<T>) => {
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
