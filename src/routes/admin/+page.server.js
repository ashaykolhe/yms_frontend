import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log(locals);
	// if (!locals.isAdmin) {
	// 	redirect(303, '/dashboard');
	// }
	// Access data set in hooks.server.js, e.g., the user object
	return {
		isAdmin: locals.isAdmin // This data will be passed to the client
	};
}
