import { fetchApi } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch, cookies, locals }) => {
	const formData = await request.json();
	const id = formData.id;
	const assignedPeople = formData.assignedPeople;
	const assignedPeopleSecond = formData.assignedPeopleSecond ?? null;

	const resp = await fetchApi(
		fetch,
		'/installations/assign-people',
		'POST',
		{
			id,
			assignedPeople,
			assignedPeopleSecond,
			user: locals.authUser?._id
		},
		cookies
	);

	return json(resp);
};
