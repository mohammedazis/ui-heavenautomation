import { fetchApiGet } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, cookies }) => {
    const districts = await fetchApiGet(fetch, '/settings/districts', cookies);

    return json(districts);
};
