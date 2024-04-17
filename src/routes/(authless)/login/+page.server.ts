import { fetchApi } from '$lib/server/api';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';
import { createSessionCookie } from '$lib/server/auth';
import { ToastMSGs } from '$lib/utils';
import { UserTypes } from '$lib/types';

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const mobileNumber = data.get('mobileNumber');
		const password = data.get('password');

		const req = {
			mobileNumber,
			password
		};

		const resp = await fetchApi(fetch, '/auth/signin', 'POST', req, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409 || resp.statusCode == 403) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		const sessionCookie = createSessionCookie(resp.session._id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		if (resp.user.type == UserTypes.ServicePerson) {
			throw redirect(302, '/service-calls');
		} else if (resp.user.type == UserTypes.MarketingPerson) {
			throw redirect(302, '/leads');
		}

		throw redirect(302, '/service-calls');
	}
};
