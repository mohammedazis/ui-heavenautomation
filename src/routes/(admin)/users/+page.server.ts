import { fetchApi, fetchApiGet } from '$lib/server/api';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs } from '$lib/utils';
import type { User } from '$lib/types';

export const load = (async ({ cookies, parent }) => {
	const resp = await fetchApiGet(fetch, `/users`, cookies);

	return {
		users: resp.users as User[]
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const name = data.get('name');
		const mobileNumber = data.get('mobileNumber');
		const type = data.get('type');
		const branch = data.get('branch');
		const password = data.get('password');
		const isActive = data.get('isActive');
		const createdBy = locals.authUser?._id;

		const resp = await fetchApi(
			fetch,
			'/auth/signup',
			'POST',
			{
				name,
				mobileNumber,
				password,
				type,
				createdBy,
				branch,
				isActive: isActive ? true : false
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
	logout: async ({ fetch, locals, cookies }) => {
		const id = locals.authUser?._id;

		const resp = await fetchApi(fetch, '/users', 'DELETE', { id }, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},
	changePassword: async ({ request, fetch, cookies, locals }) => {
		const data = await request.formData();

		const confirmPassword = data.get('confirmPassword');
		const newPassword = data.get('newPassword');
		const oldPassword = data.get('oldPassword');

		if (confirmPassword != newPassword) {
			setFlash({ type: ToastMSGs.ERROR, message: 'New & Confirm Password Not Match' }, cookies);
		}

		const resp = await fetchApi(
			fetch,
			'/auth/change-password',
			'POST',
			{
				user: locals.authUser?._id,
				newPassword,
				oldPassword
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

		const resp = await fetchApi(fetch, '/users', 'DELETE', { id }, cookies);

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
		const type = data.get('type');
		const branch = data.get('branch');
		const isActive = data.get('isActive');

		const resp = await fetchApi(
			fetch,
			'/users',
			'PATCH',
			{ type, name, mobileNumber, id, branch, isActive: isActive ? true : false },
			cookies
		);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	}
} satisfies Actions;
