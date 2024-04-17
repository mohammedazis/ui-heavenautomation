import { fetchApiGet } from '$lib/server/api';
import type { Installation, InstallationData } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, parent }) => {
	const { installation } = await parent();

	return {
		installation
	};
}) satisfies PageServerLoad;
