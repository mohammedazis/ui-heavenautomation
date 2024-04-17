import { fetchApi } from '$lib/server/api';
import { setFlash } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { ToastMSGs } from '$lib/utils';
import { fail } from '@sveltejs/kit';

export const load = (async ({ url, cookies }) => {

    const mobileNumber = url.searchParams.get('mobileNumber');

    if (mobileNumber) {
        const reqBody = {
            mobileNumber
        }

        const customers = await fetchApi(fetch, '/customers/search', 'POST', reqBody, cookies);

        if (customers.statusCode == 400 || customers.statusCode == 409) {
            Array.isArray(customers.message)
                ? customers.message.forEach((msg: any) => {
                    setFlash({ type: ToastMSGs.ERROR, message: msg }, cookies);
                })
                : setFlash({ type: ToastMSGs.ERROR, message: customers.message }, cookies);
            return fail(customers.statusCode);
        }

        setFlash({ type: ToastMSGs.SUCCESS, message: customers.message }, cookies);

        return {
            customers
        }
    } else {
        return {
            customers: []
        }
    }
}) satisfies PageServerLoad;