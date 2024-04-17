import { fetchApi, fetchApiGet } from '$lib/server/api';
import type { ServiceCallData } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, parent }) => {
	const { serviceCall } = await parent();

	const resp = await fetchApiGet(fetch, `/service-calls/datas/${serviceCall._id}`, cookies);

	const serviceCallDatas: ServiceCallData[] = resp.serviceCallDatas;

	return {
		serviceCall,
		serviceCallDatas
	};
}) satisfies PageServerLoad;
