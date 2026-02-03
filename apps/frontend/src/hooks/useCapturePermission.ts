import { useEffect } from 'react';

export default function useCapturePermission(
	type: PermissionName,
	onGranted: () => void,
	onDenied: () => void,
) {
	useEffect(() => {
		navigator.permissions.query({ name: type }).then((permission) => {
			permission.onchange = () => {
				if (permission.state === 'granted') {
					onGranted();
				}
				if (permission.state === 'denied') {
					onDenied();
				}
			};
		});
	}, [type, onGranted, onDenied]);
}
