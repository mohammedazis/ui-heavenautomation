import { fetchApi, fetchApiGet } from '$lib/server/api';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs } from '$lib/utils';

export const load = (async ({ cookies }) => {
	const resp = await fetchApiGet(fetch, `/branches`, cookies);

	return {
		branches: resp
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const name = data.get('name');
		const branchName = data.get('branchName');

		const resp = await fetchApi(
			fetch,
			'/branches',
			'POST',
			{
				name,
				branchName
			},
			cookies
		);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},

	edit: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');
		const name = data.get('name');
		const branchName = data.get('branchName');

		const resp = await fetchApi(fetch, '/branches', 'PATCH', { name, id, branchName }, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	}
} satisfies Actions;
