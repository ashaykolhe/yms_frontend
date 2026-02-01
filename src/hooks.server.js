import { authenticate } from '$lib/server/authenticate';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	event.locals.test = true;
	const is_protected =
		event.url.pathname.startsWith('/dashboard') || event.url.pathname.startsWith('/admin');

	const auth = authenticate(event.cookies);
	// if (is_protected && !auth) {
	if (!auth && !event.url.pathname.startsWith('/login')) {
		event.cookies.delete('auth-token', { path: '/' });
		throw redirect(307, '/login');
	}

	if (auth && event.url.pathname.startsWith('/login')) {
		throw redirect(307, '/long');
	}

	// console.log('auth ' + auth.name);
	if (auth) {
		event.locals.username = auth.name;
		event.locals.useremail = auth.email;
	}
	if (auth && auth.isAdmin === true) {
		console.log('isadmin ' + auth.isAdmin);
		event.locals.actionAllowed = true;
		event.locals.isAdmin = true;
	} else {
		event.locals.actionAllowed = false;
		event.locals.isAdmin = false;
	}

	// if (auth && auth.isAdmin === 'false' && event.url.pathname.startsWith('/admin')) {
	// 	throw redirect(307, '/long');
	// }

	const response = await resolve(event);
	return response;
};
