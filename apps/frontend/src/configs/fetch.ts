import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/types/api';

const client = createClient<paths>({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const middleware: Middleware = {
	async onRequest({ request, options }) {
		return request;
	},
	async onResponse({ request, response, options }) {
		return response;
	},
	async onError({ error }) {
		return new Error('에러 발생');
	},
};

client.use(middleware);

export default client;
