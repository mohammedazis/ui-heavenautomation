import { fetchApi, fetchApiGet } from '$lib/server/api';
import type { User } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params, cookies }) => {
	const resp = await fetchApiGet(fetch, `/users/${params.user}`, cookies);
	const user: User = resp.user;
	const { sessions } = await fetchApi(
		fetch,
		`/users/sessions`,
		'POST',
		{
			id: params.user
		},
		cookies
	);

	return {
		user,
		sessions
	};
}) satisfies PageServerLoad;
