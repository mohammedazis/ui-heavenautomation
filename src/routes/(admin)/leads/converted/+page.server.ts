import type { PageServerLoad } from './$types';
import {
    fetchApiGet,
} from '$lib/server/api';
import type { Lead } from '$lib/types';

export const load = (async ({ cookies, fetch, parent, url }) => {
    const { districts, services } = await parent();
    const resp = await fetchApiGet(fetch, `/leads/converted`, cookies);

    const leads: Lead[] = resp.leads;

    return {
        districts,
        services,
        leads
    };
}) satisfies PageServerLoad;