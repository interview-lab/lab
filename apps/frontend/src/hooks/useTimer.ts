import { useCallback, useEffect, useRef, useState } from 'react';

const SECOND = 1000;

/**
 * 타이머를 관리하는 훅
 * @param initialTimeSeconds 초기 시간(초)
 * @returns [time, updateTime] 타이머 시간과 시간 업데이트 함수
 */
export default function useTimer(initialTimeSeconds: number) {
	const intervalRef = useRef<NodeJS.Timeout>(null);
	const [time, setTime] = useState(initialTimeSeconds);

	const updateTime = useCallback((seconds: number) => {
		setTime(seconds);
	}, []);

	useEffect(() => {
		if (time <= 0) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		if (!intervalRef.current) {
			intervalRef.current = setInterval(() => {
				setTime((prev) => prev - 1);
			}, SECOND);
		}

		return () => {
			if (!intervalRef.current) return;

			clearInterval(intervalRef.current);
			intervalRef.current = null;
		};
	}, [time]);

	return [time, updateTime] as const;
}
