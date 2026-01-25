import { redirect } from '@sveltejs/kit';

export async function load() {
	redirect(303, '/login');
}

export const actions = {
	default: async (event) => {
		event.cookies.delete('auth-token', { path: '/' });
		// throw redirect(301, '/');
	}
};
