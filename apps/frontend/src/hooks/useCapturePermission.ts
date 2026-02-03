import { useEffect } from 'react';

/**
 * 디바이스 권한 변경을 감지하는 훅
 * @param type 권한 타입 (camera, microphone)
 * @param onGranted 권한 허용 시 호출될 함수
 * @param onDenied 권한 거부 시 호출될 함수
 */
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
