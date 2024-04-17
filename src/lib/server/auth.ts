import type { Cookies } from '@sveltejs/kit';
import { TimeSpan } from 'oslo';
import { CookieController } from 'oslo/cookie';

const sessionCookieName = 'session';

const cookieController = new CookieController(
	sessionCookieName,
	{
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/'
	},
	{
		expiresIn: new TimeSpan(30, 'd')
	}
);

const createSessionCookie = (sessionId: string) => {
	return cookieController.createCookie(sessionId);
};

const deleteSessionCookie = (cookies: Cookies) => {
	cookies.delete(sessionCookieName, {
		path: '/'
	});
};

const readBearerToken = (authorizationHeader: string): string | null => {
	const [authScheme, token] = authorizationHeader.split(' ') as [string, string | undefined];
	if (authScheme !== 'Bearer') {
		return null;
	}
	return token ?? null;
};

const readSessionCookie = (cookieHeader: string): string | null => {
	const sessionId = cookieController.parse(cookieHeader);
	return sessionId;
};

export {
	createSessionCookie,
	sessionCookieName,
	deleteSessionCookie,
	readSessionCookie,
	readBearerToken
};
