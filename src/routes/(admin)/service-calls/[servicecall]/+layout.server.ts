import { fetchApiGet } from '$lib/server/api';
import type { ServiceCall } from '$lib/types';
import type { LayoutServerLoad } from '../$types';

export const load = (async ({ params, cookies }) => {
    const serviceCall: ServiceCall = await fetchApiGet(fetch, `/service-calls/${params.servicecall}`, cookies);
    return {
        serviceCall
    };
}) satisfies LayoutServerLoad;