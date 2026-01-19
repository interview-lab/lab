import { useEffect, useState } from 'react';

const SECOND = 1000;

export default function useTimer(initialTimeSeconds: number) {
	const [time, setTime] = useState(initialTimeSeconds);

	function updateTime(seconds: number) {
		setTime(seconds);
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((seconds) => seconds - 1);
		}, SECOND);

		if (time <= 0) {
			clearInterval(timer);
		}

		return () => {
			clearInterval(timer);
		};
	});

	return [time, updateTime] as const;
}
