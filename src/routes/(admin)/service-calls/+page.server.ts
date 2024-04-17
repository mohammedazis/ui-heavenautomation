import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchApi, fetchApiFile, fetchApiGet, fetchApiLocal } from '$lib/server/api';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs } from '$lib/utils';
import type { ServiceCall } from '$lib/types';

export const load = (async ({ fetch, cookies }) => {
	const serviceCalls: ServiceCall[] = await fetchApiGet(fetch, '/service-calls', cookies);

	return {
		serviceCalls
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const service = data.get('serviceId');
		const customer = data.get('customerId');
		const mobileNumber = data.get('mobileNumber');
		const latitude = data.get('latitude');
		const longitude = data.get('longitude');
		const street = data.get('street');
		const district = data.get('district');
		const pincode = data.get('pincode');
		const area = data.get('area');
		const remarks = data.get('remarks');
		const state = 'Tamil Nadu';
		const landmark = data.get('landmark');
		const updatedAt = new Date().toISOString();
		const nextServiceAt = new Date().toISOString();
		const createdBy = locals.authUser?._id;
		const createdAt = new Date().toISOString();

		const reqBody = {
			customer,
			service,
			createdBy,
			createdAt,
			remarks,
			updatedAt,
			nextServiceAt,
			address: {
				street,
				district,
				area,
				state,
				latitude,
				longitude,
				pincode: Number(pincode),
				landmark
			},
			mobileNumber
		};

		const resp = await fetchApi(fetch, `/service-calls`, 'POST', reqBody, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		throw redirect(301, '/service-calls');
		return resp;
	},
	delete: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');

		const resp = await fetchApi(fetch, '/service-calls', 'DELETE', { id }, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},
	assignPeople: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const id = data.get('serviceId');
		const assignedPeople = data.get('userId');
		const assignedPeopleSecond = data.get('secondUserId');

		const resp = await fetchApiLocal(
			fetch,
			'api/service-calls',
			'POST',
			{ id, assignedPeople, assignedPeopleSecond },
			cookies
		);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},
	cancel: async ({ request, fetch, cookies, locals }) => {
		const data = await request.formData();

		const serviceCall = data.get('serviceCall');
		const serviceCallData = data.get('serviceCallData');
		const service = data.get('service');
		const uploadedBy = locals.authUser?._id.toString();
		const serviceDateAt = data.get('serviceDateAt');
		const remarks = data.get('remarks');

		const serviceCallDataReq = {
			serviceCall,
			service,
			serviceDateAt,
			serviceCallData,
			uploadedBy,
			remarks,
			isCancel: true,
			isCompleted: false,
			isPending: false,
		};

		const resp = await fetchApi(fetch, '/service-calls/cancel', 'POST', serviceCallDataReq, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ message: resp.message, type: ToastMSGs.SUCCESS }, cookies);
	},
	updateLocation: async ({ request, fetch, cookies, locals, params }) => {
		const data = await request.formData();

		const id = data.get('id');
		const latitude = data.get('latitude');
		const longitude = data.get('longitude');
		const street = data.get('street');
		const district = data.get('district');
		const pincode = data.get('pincode');
		const area = data.get('area');
		const state = 'Tamil Nadu';
		const landmark = data.get('landmark');
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

		const updateServiceCall = await fetchApi(
			fetch,
			'/service-calls',
			'PATCH',
			serviceReqBody,
			cookies
		);

		if (updateServiceCall.statusCode == 200) {
			setFlash({ type: ToastMSGs.SUCCESS, message: 'Location Updated Successfully' }, cookies);
		}
	},
	complete: async ({ request, fetch, cookies, locals }) => {
		const data = await request.formData();

		const serviceDateAt = data.get('serviceDateAt');
		const serviceCallId = data.get('serviceCallId');
		const serviceCallData = data.get('serviceCallData');
		const service = data.get('service');
		const files = data.getAll('files');
		const remarks = data.get('remarks');
		const isPending = data.get('isPending') == 'isPending';

		if (!remarks) {
			setFlash({ type: ToastMSGs.ERROR, message: 'Please Add the Remarks' }, cookies);
			return fail(204);
		}

		let formData = new FormData();
		if (serviceCallId) formData.append('serviceCall', serviceCallId);
		if (serviceDateAt) formData.append('serviceDateAt', serviceDateAt);
		if (service) formData.append('service', service);
		if (remarks) formData.append('remarks', remarks);
		if (serviceCallData) formData.append('serviceCallData', serviceCallData);
		formData.append('isPending', isPending);
		formData.append('isCompleted', !isPending);

		formData.append('uploadedBy', locals.authUser?._id);
		formData.append('uploadedAt', new Date().toISOString());

		files.map((file) => {
			formData.append('files', file.valueOf() as File);
		});

		const resp = await fetchApiFile(fetch, '/service-calls/complete', 'POST', formData, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ message: resp.message, type: ToastMSGs.SUCCESS }, cookies);

		throw redirect(301, '/service-calls');
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

		setFlash({ message: resp.message, type: ToastMSGs.SUCCESS }, cookies);

		return resp;
	}
} satisfies Actions;
