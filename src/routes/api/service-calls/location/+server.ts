import { fetchApi } from '$lib/server/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs } from '$lib/utils';

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
	const formData = await request.json();
	const id = formData.id;

	const latitude = formData.latitude;
	const longitude = formData.longitude;
	const street = formData.street;
	const district = formData.district;
	const pincode = formData.pincode;
	const area = formData.area;
	const state = 'Tamil Nadu';
	const landmark = formData.landmark;
	const updatedAt = new Date().toISOString();

	const serviceReqBody = {
		id,
		updatedAt,
		address: {
			street,
			district,
			area,
			state,
			latitude,
			longitude,
			pincode: Number(pincode),
			landmark
		}
	};

	const resp = await fetchApi(fetch, '/service-calls', 'PATCH', serviceReqBody, cookies);

	if (resp.statusCode == 200) {
		setFlash({ type: ToastMSGs.SUCCESS, message: 'Location Updated Successfully' }, cookies);
	}

	return json(resp);
};
