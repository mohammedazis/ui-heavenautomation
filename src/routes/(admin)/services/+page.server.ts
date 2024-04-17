import { API_ENDPOINT } from '$env/static/private';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchApi, fetchApiGet } from '$lib/server/api';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs } from '$lib/utils';
import type { Service } from '$lib/types';

export const load = (async ({ cookies }) => {
	const resp = await fetchApiGet(fetch, `/services`, cookies);

	const services: Service[] = resp.services;

	return {
		count: resp.count,
		services
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const name = data.get('name');
		const slug = data.get('slug');
		const createdBy = locals.authUser?._id;
		const createdAt = new Date().toISOString();

		const resp = await fetchApi(
			fetch,
			'/services',
			'POST',
			{ name, slug, createdAt, createdBy },
			cookies
		);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},
	delete: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');

		const resp = await fetchApi(fetch, '/services', 'DELETE', { id }, cookies);
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
		const slug = data.get('slug');

		const resp = await fetchApi(fetch, '/services', 'PATCH', { name, slug, id }, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	}
} satisfies Actions;
