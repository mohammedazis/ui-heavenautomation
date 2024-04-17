import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { fetchApiGet } from '$lib/server/api';
import type { Branch } from '$lib/types';

export const load = (async ({ fetch, locals, cookies }) => {
	if (!locals.authUser) throw redirect(302, '/login');
	const { authSession, authUser } = locals;
	const branches: Branch[] = await fetchApiGet(fetch, '/branches', cookies);

	return {
		branches,
		authUser,
		authSession
	};
}) satisfies LayoutServerLoad;
