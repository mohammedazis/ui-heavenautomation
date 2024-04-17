import type { RequestHandler } from './$types';
import { fetchApi } from '$lib/server/api';
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, fetch, cookies }) => {
	const formData = await request.json();
	const id = formData.id;

	const resp = await fetchApi(fetch, '/users/session', 'DELETE', {
		id
	}, cookies);
	return json(resp);
};
