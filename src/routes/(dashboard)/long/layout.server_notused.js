export const load = async ({ locals }) => {
	console.log('dashboard layout server ' + locals.isAdmin);
	return { isAdmin: locals.isAdmin };
};
