import { type RefObject, useCallback, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
	ref: RefObject<T | null>,
	callback: () => void,
) => {
	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (ref?.current && !ref.current.contains(e.target as Node)) {
				callback();
			}
		},
		[callback, ref],
	);

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [handleClick]);
};

export default useClickOutside;
