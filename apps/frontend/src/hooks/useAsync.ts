import { useCallback, useRef, useState } from 'react';

interface UseAsyncReturn<T> {
	isLoading: boolean;
	error: string;
	execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>;
	reset: () => void;
}

/**
 * 비동기 작업을 관리하는 훅
 * @returns 비동기 작업 상태와 실행 함수
 */
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
			} else {
				setError('문제가 발생했습니다.');
			}
			return;
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
