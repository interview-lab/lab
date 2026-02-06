import { type AudioPipelineInputs, pipeline } from '@huggingface/transformers';

async function loadTransScriber() {
	return await pipeline(
		'automatic-speech-recognition',
		'onnx-community/whisper-large-v3-turbo',
		{ dtype: 'q4', device: 'webgpu' },
	);
}

export async function transcript(audio: AudioPipelineInputs) {
	const transcriber = await loadTransScriber();

	return transcriber(audio, { language: 'korean' });
}
