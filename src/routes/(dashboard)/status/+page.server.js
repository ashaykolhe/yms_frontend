import { deserialize } from '$app/forms';
import { Status } from '$lib/server/models/videoStatus.model.js';
import { VideoVersionHistory } from '$lib/server/models/videoVersionHistory.model.js';
import { formBody } from '$lib/server/utils.js';
import { error, fail, json } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log('locals useremail ' + locals.useremail);
	// let columns = '_id title description status Status userCreatedBy createdAt';
	// let Statuss = await Status.find({ softDelete: false, type: 'long', archived: false }, columns);

	// console.log('load ' + Statuss);
	// let todos = deserialize(videos);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail
		// Statuss: JSON.parse(JSON.stringify(Statuss))
	};
};

export const actions = {
	addNewStatus: async ({ request, locals }) => {
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
		// console.log('addNewStatus title ' + title + ' addNewStatus description ' + description);
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

			const status = await Status.create(data);
			console.log(status);
			return { success: true, message: `You created ${status.title} status` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
			// return { error: true, message: err.message };
			// return error(400, { message: err.message });
		}
	},
	editStatus: async ({ request, locals }) => {
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

			let status = await Status.findByIdAndUpdate(data._id, data, {
				new: true
			});
			if (!status) {
				return fail(400, { returndata: data, error: true, message: 'Status not found.' });
			}
			return { success: true, message: `You updated ${status.title} status` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
		}
	},
	permanentDeleteStatus: async ({ request, locals }) => {
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
			// const status = await Status.findByIdAndDelete(id);
			const result = await Status.deleteMany({
				_id: { $in: idsArray }
			});

			return {
				success: true,
				message:
					result.deletedCount + `Status${result.deletedCount > 1 ? 's' : ''} deleted permanently`
			};
		} catch (error) {
			return fail(500, { error: true, message: error.message });
		}
	}
};
