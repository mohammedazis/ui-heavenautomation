import { fetchApiGet } from '$lib/server/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	const serviceCalls = await fetchApiGet(fetch, '/service-calls/pendings?type=false', cookies);

	return {
		serviceCalls
	};
}) satisfies PageServerLoad;
