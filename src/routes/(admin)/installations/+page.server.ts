import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchApi, fetchApiFile, fetchApiGet, fetchApiLocal } from '$lib/server/api';
import { setFlash } from 'sveltekit-flash-message/server';
import { ToastMSGs, serializeNonPOJOs } from '$lib/utils';
import type { Installation } from '$lib/types';

export const load = (async ({ fetch, cookies }) => {
	const installations: Installation[] = await fetchApiGet(fetch, '/installations', cookies);

	return {
		installations
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const name = data.get('name');
		const service = data.get('serviceId');
		const customer = data.get('customerId');
		const mobileNumber = data.get('mobileNumber');
		const latitude = data.get('latitude');
		const longitude = data.get('longitude');
		const street = data.get('street');
		const district = data.get('district');
		const pincode = data.get('pincode');
		const remarks = data.get('remarks');
		const area = data.get('area');
		const state = 'Tamil Nadu';
		const landmark = data.get('landmark');
		const nextServiceAt = new Date().toISOString();
		const createdBy = locals.authUser?._id;
		const createdAt = new Date().toISOString();
		const updatedAt = new Date().toISOString();

		const reqBody = {
			name,
			customer,
			service,
			createdBy,
			createdAt,
			updatedAt,
			remarks,
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

		const resp = await fetchApi(fetch, `/installations`, 'POST', reqBody, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		throw redirect(301, '/installations');
	},
	delete: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');

		const resp = await fetchApi(fetch, '/installations', 'DELETE', { id }, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},
	assignPeople: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const assignedPeople = data.get('userId');
		const id = data.get('installationId');
		const assignedPeopleSecond = data.get('secondUserId');
		const user = locals.authUser?._id;

		const resp = await fetchApiLocal(
			fetch,
			'api/installations',
			'POST',
			{ id, assignedPeople, assignedPeopleSecond, user },
			cookies
		);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},

	complete: async ({ request, fetch, cookies, setHeaders, params, locals }) => {
		const data = await request.formData();

		const installationDateAt = data.get('installationDateAt');
		const installationId = data.get('installationId');
		const serviceCall = data.get('serviceCall');
		const serviceCallData = data.get('serviceCallData');
		const files = data.getAll('files');
		const remarks = data.get('remarks');
		const isPending = data.get('isPending') == 'isPending';

		if (!remarks) {
			setFlash({ type: ToastMSGs.ERROR, message: 'Enter the Remarks' }, cookies);
			return fail(307);
		}

		let formData = new FormData();
		if (installationId) formData.append('installation', installationId);
		if (serviceCall) formData.append('serviceCall', serviceCall);
		if (serviceCallData) formData.append('serviceCallData', serviceCallData);

		if (installationDateAt) formData.append('installationDateAt', installationDateAt);
		if (remarks) formData.append('remarks', remarks);
		formData.append('isPending', isPending);
		formData.append('isCompleted', !isPending);

		formData.append('uploadedBy', locals.authUser?._id);
		formData.append('uploadedAt', new Date().toISOString());

		files.map((file) => {
			formData.append('files', file.valueOf() as File);
		});

		const resp = await fetchApiFile(fetch, '/installations/complete', 'POST', formData, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ message: resp.message, type: ToastMSGs.SUCCESS }, cookies);

		throw redirect(301, `/service-calls/${serviceCall}`);
	},
	edit: async ({ request, fetch, cookies, locals }) => {
		const data = await request.formData();

		const id = data.get('id');
		const service = data.get('serviceId');
		const latitude = data.get('latitude');
		const longitude = data.get('longitude');
		const street = data.get('street');
		const district = data.get('district');
		const pincode = data.get('pincode');
		const remarks = data.get('remarks');
		const area = data.get('area');
		const state = 'Tamil Nadu';
		const landmark = data.get('landmark');
		const nextServiceAt = new Date().toISOString();
		const updatedAt = new Date().toISOString();

		const reqBody = {
			id,
			service,
			updatedAt,
			remarks,
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
			}
		};

		const resp = await fetchApi(fetch, `/installations`, 'PATCH', reqBody, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	}
} satisfies Actions;
