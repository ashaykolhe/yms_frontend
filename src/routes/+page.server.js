// src/routes/+page.server.js (or .ts)
import { redirect } from '@sveltejs/kit';

export function load() {
	// Redirect to the desired page, e.g., '/home'
	redirect(303, '/login');
}
