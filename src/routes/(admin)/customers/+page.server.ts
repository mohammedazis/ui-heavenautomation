import { fetchApi, fetchApiGet } from '$lib/server/api';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs } from '$lib/utils';
import type { Customer } from '$lib/types';

export const load = (async ({ fetch, cookies }) => {
	const resp = await fetchApiGet(fetch, `/customers`, cookies);
	const customers: Customer[] = resp.customers;

	return {
		customers
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const name = data.get('name');
		const mobileNumber = data.get('mobileNumber');
		const createdBy = locals.authUser?._id;
		const createdAt = new Date().toISOString();

		const resp = await fetchApi(
			fetch,
			'/customers',
			'POST',
			{
				name,
				mobileNumber,
				createdAt,
				createdBy
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
	delete: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');

		const resp = await fetchApi(fetch, '/customers', 'DELETE', { id }, cookies);

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
		const mobileNumber = data.get('mobileNumber');

		const resp = await fetchApi(fetch, '/customers', 'PATCH', { name, mobileNumber, id }, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	}
} satisfies Actions;
