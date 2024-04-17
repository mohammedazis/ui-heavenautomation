import { fetchApiGet } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const resp = await fetchApiGet(fetch, `/users/inactive`, cookies);

    return {
        users: resp.users
    };
}) satisfies PageServerLoad;