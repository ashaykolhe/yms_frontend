import { deserialize } from '$app/forms';
import { Domain } from '$lib/server/models/domain.model';
import { VideoVersionHistory } from '$lib/server/models/videoVersionHistory.model.js';
import { formBody } from '$lib/server/utils.js';
import { error, fail, json } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log('locals useremail ' + locals.useremail);
	// let columns = '_id title description status domain userCreatedBy createdAt';
	// let Domains = await Domain.find({ softDelete: false, type: 'long', archived: false }, columns);

	// console.log('load ' + Domains);
	// let todos = deserialize(videos);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail
		// Domains: JSON.parse(JSON.stringify(Domains))
	};
};

export const actions = {
	addNewDomain: async ({ request, locals }) => {
		let formdata = await request.formData();
		// console.log('formdata');
		// console.log(formdata);
		let data = formBody(formdata);
		// console.log('data');
		// console.log(data);
		// console.log('formbody');
		// console.log(data);
		// console.log('data.title' + data.title);
		if (!data.title) {
			return fail(400, { returndata: data, error: true, message: 'Title must be present' });
			// return { error: true, message: 'Title must be present' };
		}
		// const description = data.description;
		// console.log('addNewDomain title ' + title + ' addNewDomain description ' + description);
		try {
			data.userCreatedBy = locals.useremail;
			data.userUpdatedBy = locals.useremail;
			if (data?.archived === 'on') {
				data.archived = true;
			} else {
				data.archived = false;
			}

			if (data?.softDelete === 'on') {
				data.softDelete = true;
			} else {
				data.softDelete = false;
			}

			const domain = await Domain.create(data);
			console.log(domain);
			return { success: true, message: `You created ${domain.title} domain` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
			// return { error: true, message: err.message };
			// return error(400, { message: err.message });
		}
	},
	editDomain: async ({ request, locals }) => {
		let formdata = await request.formData();
		// console.log('formdata');
		// console.log(formdata);
		let data = formBody(formdata);
		// console.log('data');
		// console.log(data);
		// console.log('formbody');
		// console.log(data);
		// console.log('data.title' + data.title);
		if (!data.title) {
			return fail(400, { returndata: data, error: true, message: 'Title must be present' });
		}
		try {
			// data.userCreatedBy = locals.useremail;
			data.userUpdatedBy = locals.useremail;
			if (data?.archived === 'on') {
				data.archived = true;
			} else {
				data.archived = false;
			}

			if (data?.softDelete === 'on') {
				data.softDelete = true;
			} else {
				data.softDelete = false;
			}

			let domain = await Domain.findByIdAndUpdate(data._id, data, {
				new: true
			});
			if (!domain) {
				return fail(400, { returndata: data, error: true, message: 'Domain not found.' });
			}
			return { success: true, message: `You updated ${domain.title} domain` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
		}
	},
	permanentDeleteDomain: async ({ request, locals }) => {
		if (!locals.isAdmin) {
			fail(400, { error: true, message: 'Unauthorized!' });
		}
		let formdata = await request.formData();
		// console.log('formdata');
		// console.log(formdata);
		let data = formBody(formdata);
		// console.log('data');
		// console.log(data);
		// console.log('formbody');
		// console.log(data);
		// console.log('data.title' + data.title);
		if (!data._id) {
			return fail(400, { error: true, message: 'Id must be present' });
		}
		try {
			const idsArray = data._id.split(',');
			// const domain = await Domain.findByIdAndDelete(id);
			const result = await Domain.deleteMany({
				_id: { $in: idsArray }
			});

			return {
				success: true,
				message:
					result.deletedCount + `Domain${result.deletedCount > 1 ? 's' : ''} deleted permanently`
			};
		} catch (error) {
			return fail(500, { error: true, message: error.message });
		}
	}
};
