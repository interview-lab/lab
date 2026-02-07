import { catchError } from '@interview-lab/shared';
import { transcript } from '@/utils/transcript';

export type TranscriptWorkerResponse =
	| {
			isSuccess: true;
			result: unknown;
	  }
	| {
			isSuccess: false;
			error: string;
	  };

self.onmessage = async (event) => {
	const [error, result] = await catchError(transcript(event.data));
	if (error) {
		self.postMessage({
			isSuccess: false,
			error: error.message,
		} satisfies TranscriptWorkerResponse);
		return;
	}
	self.postMessage({
		isSuccess: true,
		result,
	} satisfies TranscriptWorkerResponse);
};
