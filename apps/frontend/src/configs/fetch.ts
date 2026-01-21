import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/types/api';

const client = createClient<paths>({
	baseUrl: process.env.NEXT_PUBLIC_API_SERVER,
});

const middleware: Middleware = {
	async onRequest({ request }) {
		request.headers.set('Content-Type', 'application/json');
		request.headers.set('credentials', 'include');

		return request;
	},
	async onResponse({ response }) {
		return response;
	},
	async onError() {
		return new Error('에러 발생');
	},
};

client.use(middleware);

export default client;
