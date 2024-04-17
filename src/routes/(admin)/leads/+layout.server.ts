import { fetchApiLocalGet } from '$lib/server/api';
import type { District, Service } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
	const districts: District[] = await fetchApiLocalGet(fetch, '/api/districts', cookies);
	const services: Service[] = await fetchApiLocalGet(fetch, '/api/services', cookies);

	return {
		districts,
		services
	};
}) satisfies LayoutServerLoad;
