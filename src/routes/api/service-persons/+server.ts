import { fetchApi, fetchApiGet } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, fetch, cookies }) => {
	const resp = await fetchApiGet(fetch, '/users', cookies);

	return json(resp);
};
