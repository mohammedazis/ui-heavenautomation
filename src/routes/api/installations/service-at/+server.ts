import { fetchApi } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch, cookies, locals }) => {
    const formData = await request.json();
    const id = formData.id;
    const nextServiceAt = formData.nextServiceAt;

    const resp = await fetchApi(fetch, '/installations/update-next-service-date', 'POST', {
        id,
        user: locals.authUser?._id,
        nextServiceAt,
    }, cookies);

    return json(resp);
};