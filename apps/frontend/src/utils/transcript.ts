import { type AudioPipelineInputs, pipeline } from '@huggingface/transformers';

async function loadTransScriber() {
	return await pipeline(
		'automatic-speech-recognition',
		'onnx-community/whisper-base',
		{ dtype: 'fp32', device: 'webgpu' },
	);
}

export async function transcript(audio: AudioPipelineInputs) {
	const transcriber = await loadTransScriber();

	return transcriber(audio, { language: 'korean' });
}
