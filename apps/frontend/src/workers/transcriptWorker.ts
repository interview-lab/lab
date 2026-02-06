import { transcript } from '@/utils/transcript';

self.onmessage = async (event) => {
	const result = await transcript(event.data);
	self.postMessage(result);
};
