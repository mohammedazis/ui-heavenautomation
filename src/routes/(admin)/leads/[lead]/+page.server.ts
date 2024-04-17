import { fetchApiGet } from '$lib/server/api';
import type { Lead } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies, params }) => {
	const resp: Lead = await fetchApiGet(fetch, `/leads/${params.lead}`, cookies);
	return {
		lead: resp
	};
}) satisfies PageServerLoad;
