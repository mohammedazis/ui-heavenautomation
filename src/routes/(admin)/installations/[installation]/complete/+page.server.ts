import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const { installation } = await parent();

    return {
        installation
    };
}) satisfies PageServerLoad;