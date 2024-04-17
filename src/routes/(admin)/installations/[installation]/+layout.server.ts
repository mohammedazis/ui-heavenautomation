import { fetchApiGet } from '$lib/server/api';
import type { Installation, } from '$lib/types';
import type { LayoutServerLoad } from '../$types';

export const load = (async ({ params, cookies }) => {
    const installation: Installation = await fetchApiGet(fetch, `/installations/${params.installation}`, cookies);
    return {
        installation
    };
}) satisfies LayoutServerLoad;