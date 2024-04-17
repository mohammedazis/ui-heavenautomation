import { fetchApiGet } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, fetch, cookies }) => {
    const { leads } = await fetchApiGet(fetch, '/leads', cookies);

    return json(leads);
};
