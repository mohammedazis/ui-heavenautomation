import { fetchApiGet } from '$lib/server/api';
import type { ServiceCall, ServiceCallData } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	const serviceCalls: ServiceCallData[] = await fetchApiGet(fetch, '/service-calls/completed?type=false', cookies);

	return {
		serviceCalls
	};
}) satisfies PageServerLoad;
