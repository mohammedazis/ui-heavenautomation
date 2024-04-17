import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const { serviceCall } = await parent();

    return {
        serviceCall
    };
}) satisfies PageServerLoad;