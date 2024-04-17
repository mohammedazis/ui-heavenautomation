import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	fetchApi,
	fetchApiFile,
	fetchApiGet,
	fetchApiLocal,
	fetchApiLocalGet
} from '$lib/server/api';
import { setFlash } from 'sveltekit-flash-message/server';
import { serializeNonPOJOs, ToastMSGs } from '$lib/utils';
import type { District, Lead, Service } from '$lib/types';
import moment from 'moment';

export const load = (async ({ cookies, fetch, parent, url }) => {
	const { districts, services } = await parent();
	const resp = await fetchApiGet(fetch, `/leads${url.search}`, cookies);

	const leads: Lead[] = resp.leads;

	return {
		districts,
		services,
		leads
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const companyName = data.get('companyName');
		const name = data.get('name');
		const mobileNumber = data.get('mobileNumber');
		const reference = data.get('reference');
		const description = data.get('description');
		const district = data.get('districtId');
		const area = data.get('customAddressArea');
		const street = data.get('customAddressStreet');
		const nextFollowUpAt = data.get('nextFollowUpAt')
			? moment(data.get('nextFollowUpAt')?.toString(), 'YYYY-MM-DD kk:mm').utcOffset(330).format()
			: moment().utcOffset(330).format();
		const priority = data.get('priority');
		const landmark = data.get('remarks');
		const createdBy = locals.authUser?._id;
		const createdAt = moment().utcOffset(330).format();
		const assignedTo = data.get('userId');
		const assignedBy = locals.authUser?._id;
		const updatedBy = locals.authUser?._id;
		const updatedAt = moment().utcOffset(330).format();
		const assignedAt = moment().utcOffset(330).format();

		const liveLatitude = data.get('latitude');
		const liveLongitude = data.get('longitude');
		const liveStreet = data.get('street');
		const liveDistrict = data.get('district');
		const livePincode = data.get('pincode');
		const liveArea = data.get('area');
		const liveState = 'Tamil Nadu';
		const liveLandmark = data.get('landmark');

		const services = data.getAll('services');

		const reqBody = {
			services,
			reference,
			companyName,
			description,
			createdBy,
			priority,
			nextFollowUpAt,
			createdAt,
			assignedBy,
			assignedAt,
			assignedTo,
			updatedAt,
			updatedBy,
			contactPerson: {
				name,
				mobileNumber
			},
			address: {
				street: liveStreet,
				district: liveDistrict,
				area: liveArea,
				state: liveState,
				latitude: liveLatitude,
				longitude: liveLongitude,
				pincode: Number(livePincode),
				landmark: liveLandmark
			},
			customAddress: {
				district,
				street,
				area,
				landmark
			}
		};

		const resp = await fetchApi(fetch, '/leads', 'POST', reqBody, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		throw redirect(301, '/leads');
	},
	assignPeople: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const assignedPeople = data.get('userId');
		const id = data.get('installationId');
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
	upload: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');
		const files = data.getAll('files');

		let formData = new FormData();
		if (id) formData.append('id', id);

		files.map((file) => {
			formData.append('files', file.valueOf() as File);
		});

		const resp = await fetchApiFile(fetch, '/leads/upload', 'POST', formData, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ message: resp.message, type: ToastMSGs.SUCCESS }, cookies);

		return resp;
	},
	delete: async ({ request, fetch, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');

		const resp = await fetchApi(fetch, '/leads', 'DELETE', { id }, cookies);

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
	convert: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');
		const name = data.get('name');
		const mobileNumber = data.get('mobileNumber');
		const description = data.get('description');
		const convertedBy = locals.authUser?._id;
		const convertedAt = new Date().toISOString();

		const customerBody = {
			createdBy: convertedBy,
			createdAt: convertedAt,
			name,
			mobileNumber
		};

		const customer = await fetchApi(fetch, '/customers', 'POST', customerBody, cookies);

		if (customer.statusCode == 400 || customer.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: customer.message }, cookies);
			return fail(customer.statusCode);
		}

		const leadBody = {
			convertedAt,
			description,
			id,
			convertedBy,
			customer: customer.id
		};

		const lead = await fetchApi(fetch, '/leads/convert', 'PATCH', leadBody, cookies);

		if (lead.statusCode == 400 || lead.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: lead.message }, cookies);
			return fail(lead.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: lead.message }, cookies);

		return lead;
	},
	updateLocation: async ({ request, fetch, locals, cookies }) => {

		const data = await request.formData();

		const liveLatitude = data.get('latitude');
		const liveLongitude = data.get('longitude');
		const id = data.get('leadId');

		const liveStreet = data.get('street');
		const liveDistrict = data.get('district');
		const livePincode = data.get('pincode');
		const liveArea = data.get('area');
		const liveState = 'Tamil Nadu';
		const liveLandmark = data.get('landmark');

		const reqBody = {
			id,
			liveLocation: true,
			address: {
				street: liveStreet,
				district: liveDistrict,
				area: liveArea,
				state: liveState,
				latitude: liveLatitude,
				longitude: liveLongitude,
				pincode: Number(livePincode),
				landmark: liveLandmark
			},
		}

		const resp = await fetchApi(fetch, '/leads', 'PATCH', reqBody, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	},
	edit: async ({ request, fetch, locals, cookies }) => {
		const data = await request.formData();

		const id = data.get('leadId');
		const name = data.get('name');
		const mobileNumber = data.get('mobileNumber');
		const reference = data.get('reference');
		const description = data.get('description');
		const district = data.get('districtId');
		const area = data.get('customAddressArea');
		const street = data.get('customAddressStreet');
		const nextFollowUpAt = data.get('nextFollowUpAt')
			? moment(data.get('nextFollowUpAt')?.toString(), 'YYYY-MM-DD kk:mm').utcOffset(330).format()
			: moment().utcOffset(330).format();
		const priority = data.get('priority');
		const landmark = data.get('remarks');
		const landmarkAddress = data.get('landmark');
		const createdBy = locals.authUser?._id;
		const createdAt = new Date().toISOString();
		const assignedTo = data.get('userId');
		const assignedBy = locals.authUser?._id;
		let assignedAt;
		if (assignedBy) {
			assignedAt = new Date().toISOString();
		}

		const services = data.getAll('services');

		const reqBody = {
			services,
			id,
			reference,
			description,
			createdBy,
			priority,
			nextFollowUpAt,
			assignedAt,
			assignedBy,
			assignedTo,
			createdAt,
			customer: {
				name,
				mobileNumber
			},
			customAddress: {
				district,
				street,
				area,
				landmark
			}
		};

		const resp = await fetchApi(fetch, '/leads', 'PATCH', reqBody, cookies);

		if (resp.statusCode == 400 || resp.statusCode == 409) {
			setFlash({ type: ToastMSGs.ERROR, message: resp.message }, cookies);
			return fail(resp.statusCode);
		}

		setFlash({ type: ToastMSGs.SUCCESS, message: resp.message }, cookies);

		return resp;
	}
} satisfies Actions;
