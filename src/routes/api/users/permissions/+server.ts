import { fetchApi } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ request, fetch, locals, cookies }) => {
	const formData = await request.json();
	const id = formData.id;
	const permissions = formData.permissions;
	const resp = await fetchApi(fetch, '/users/permissions', 'PATCH', {
		id,
		permissions
	}, cookies);

	return json(resp);
};
