import type { RequestHandler } from './$types';
import { fetchApiGet } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import { sessionCookieName } from '$lib/server/auth';

export const GET: RequestHandler = async ({ fetch, cookies }) => {
	const resp = await fetchApiGet(fetch, '/auth/logout', cookies);
	cookies.delete(sessionCookieName, {
		path: '/'
	});
	return json(resp);
};
