import { fetchApi } from '$lib/server/api';
import { sessionCookieName, createSessionCookie } from '$lib/server/auth';
import { ToastMSGs } from '$lib/utils';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';
import { User } from 'lucide-svelte';
import { setFlash } from 'sveltekit-flash-message/server';

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	const sessionId = event.cookies.get(sessionCookieName);
	if (sessionId) request.headers.set('x-session-id', sessionId);
	return fetch(request);
};

// export const handleError = ({ error, event }) => {
// 	// you can capture the `error` and `event` from the client
// 	// but it only runs if the unexpected error comes from `+page.ts`
// 	console.log(error);
// 	return {
// 		// don't show sensitive data to the user
// 		message: 'Yikes! 💩'
// 	};
// };

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(sessionCookieName);

	if (!sessionId) {
		event.locals.authUser = null;
		event.locals.authSession = null;
		return resolve(event);
	}

	const { session, user } = await fetchApi(event.fetch, '/auth/validate', 'POST', {
		id: sessionId
	}, event.cookies);

	if (user && !user.isActive) {
		event.locals.authUser = null;
		event.locals.authSession = null;
		setFlash({ type: ToastMSGs.ERROR, message: "Please Contact Your Administrator" }, event.cookies)
		return resolve(event);
	}

	if (session?.fresh) {
		const sessionCookie = createSessionCookie(session._id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}


	// if (!session) {
	// 	await deleteSessionCookie(lucia, event.cookies);
	// }

	if (event.route.id?.includes('/(admin)') && event.locals.authUser) throw redirect(302, '/login');

	event.locals.authUser = user;
	event.locals.authSession = session;

	const response = await resolve(event);


	return response;
};


// const securityHeaders = {
// 	'Referrer-Policy': 'strict-origin-when-cross-origin',
// };
// Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));