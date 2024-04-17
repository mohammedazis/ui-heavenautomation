import { API_ENDPOINT } from '$env/static/private';
import { type Cookies } from '@sveltejs/kit';
import { sessionCookieName } from './auth';

const fetchApiLocalGet = async (fetch: any, url: String, cookies: Cookies) => {
	const sessionId = cookies.get(sessionCookieName);

	const currentFetchUrl = `${url}`;

	console.log(`Current Fetching : ${currentFetchUrl}`);

	const requ = await fetch(currentFetchUrl, {
		method: 'GET',
		headers: {
			'x-session-id': sessionId
		}
	});

	return await requ.json();
};

const fetchApiGet = async (fetch: any, url: String, cookies: Cookies) => {
	const sessionId = cookies.get(sessionCookieName);

	const currentFetchUrl = `${API_ENDPOINT}${url}`;

	console.log(`Current Fetching : ${currentFetchUrl}`);

	const requ = await fetch(currentFetchUrl, {
		method: 'GET',
		headers: {
			'x-session-id': sessionId
		}
	});

	return await requ.json();
};

const fetchApiFile = async (
	fetch: any,
	url: String,
	method: String,
	body: any,
	cookies: Cookies,
	multiPart: Boolean = false
) => {
	const sessionId = cookies.get(sessionCookieName);
	const currentFetchUrl = `${API_ENDPOINT}${url}`;

	console.log(`Current Fetching : ${currentFetchUrl}`);

	const requ = await fetch(currentFetchUrl, {
		method,
		headers: {
			'x-session-id': sessionId
		},
		body: body
	});

	return await requ.json();
};

const fetchApiLocal = async (
	fetch: any,
	url: string,
	method: string,
	body: any,
	cookies: Cookies
) => {
	const sessionId = cookies.get(sessionCookieName);

	const currentFetchUrl = `/${url}`;

	console.log(`Current Fetching : ${currentFetchUrl}`);

	const requ = await fetch(currentFetchUrl, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'x-session-id': sessionId
		},
		body: JSON.stringify(body)
	});

	return await requ.json();
};
const fetchApi = async (fetch: any, url: String, method: String, body: any, cookies: Cookies) => {
	const sessionId = cookies.get(sessionCookieName);

	const currentFetchUrl = `${API_ENDPOINT}${url}`;

	console.log(`Current Fetching : ${currentFetchUrl} || Method : ${method}`);

	const requ = await fetch(currentFetchUrl, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'x-session-id': sessionId
		},
		body: JSON.stringify(body)
	});

	const resp = await requ.json();

	return resp;
};

export { fetchApi, fetchApiGet, fetchApiFile, fetchApiLocal, fetchApiLocalGet };
