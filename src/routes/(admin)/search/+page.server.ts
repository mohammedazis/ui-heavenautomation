import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { ToastMSGs } from '$lib/utils';
import { fetchApi } from '$lib/server/api';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    customers: async ({ request, fetch, cookies }) => {
        const data = await request.formData();

        const mobileNumber = data.get('mobileNumber');

        const reqBody = {
            mobileNumber
        }

        const resp = await fetchApi(fetch, '/customers/search', 'POST', reqBody, cookies);

        if (resp.statusCode == 400 || resp.statusCode == 409) {
            Array.isArray(resp.message)
                ? resp.message.forEach((msg: any) => {
                    setFlash({ type: ToastMSGs.ERROR, message: msg }, cookies);
                })
                : setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
            return fail(resp.statusCode);
        }

        setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

        return {
            success: true,
            ...resp
        };
    },
    users: async ({ request, fetch, cookies }) => {
        const data = await request.formData();

        const mobileNumber = data.get('mobileNumber');

        const reqBody = {
            mobileNumber
        }

        const resp = await fetchApi(fetch, '/users/search', 'POST', reqBody, cookies);

        if (resp.statusCode == 400 || resp.statusCode == 409) {
            Array.isArray(resp.message)
                ? resp.message.forEach((msg: any) => {
                    setFlash({ type: ToastMSGs.ERROR, message: msg }, cookies);
                })
                : setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
            return fail(resp.statusCode);
        }

        setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

        return resp;
    },
} satisfies Actions;
