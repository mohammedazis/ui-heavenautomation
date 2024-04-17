import { fetchApi, fetchApiGet } from '$lib/server/api';
import type { Installation, ServiceCall } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params, cookies }) => {
	const resp = await fetchApiGet(fetch, `/customers/${params.customer}`, cookies);
	const serviceCalls: ServiceCall[] = await fetchApi(
		fetch,
		'/service-calls/customers',
		'POST',
		{
			customer: params.customer
		},
		cookies
	);
	const installations: Installation[] = await fetchApi(
		fetch,
		'/installations/customers',
		'POST',
		{
			customer: params.customer,
			completed: true
		},
		cookies
	);

	return {
		customer: resp.customer,
		serviceCalls,
		installations
	};
}) satisfies PageServerLoad;
