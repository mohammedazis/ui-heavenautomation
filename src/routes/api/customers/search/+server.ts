import { fetchApi } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
	const formData = await request.json();
	const mobileNumber = formData.mobileNumber;

	const resp = await fetchApi(fetch, '/customers/search', 'POST', {
		mobileNumber
	}, cookies);

	return json(resp);
};
