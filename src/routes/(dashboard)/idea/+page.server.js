import { deserialize } from '$app/forms';
import { Idea } from '$lib/server/models/idea.model';

import { formBody } from '$lib/server/utils.js';
import { error, fail, json } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log('locals useremail ' + locals.useremail);
	// let columns = '_id title description idea Idea userCreatedBy createdAt';
	// let Ideas = await Idea.find({ softDelete: false, type: 'long', archived: false }, columns);

	// console.log('load ' + Ideas);
	// let todos = deserialize(videos);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail
		// Ideas: JSON.parse(JSON.stringify(Ideas))
	};
};

export const actions = {
	addNewIdea: async ({ request, locals }) => {
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
		if (!data.idea) {
			return fail(400, { returndata: data, error: true, message: 'Idea must be present' });
			// return { error: true, message: 'Title must be present' };
		}
		// const description = data.description;
		// console.log('addNewIdea title ' + title + ' addNewIdea description ' + description);
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

			const idea = await Idea.create(data);
			console.log(idea);
			return { success: true, message: `You created ${idea.title} idea` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
			// return { error: true, message: err.message };
			// return error(400, { message: err.message });
		}
	},
	editIdea: async ({ request, locals }) => {
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

			let idea = await Idea.findByIdAndUpdate(data._id, data, {
				new: true
			});
			if (!idea) {
				return fail(400, { returndata: data, error: true, message: 'Idea not found.' });
			}
			return { success: true, message: `You updated ${idea.title} idea` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
		}
	},
	permanentDeleteIdea: async ({ request, locals }) => {
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
			// const idea = await Idea.findByIdAndDelete(id);
			const result = await Idea.deleteMany({
				_id: { $in: idsArray }
			});

			return {
				success: true,
				message:
					result.deletedCount + `Idea${result.deletedCount > 1 ? 's' : ''} deleted permanently`
			};
		} catch (error) {
			return fail(500, { error: true, message: error.message });
		}
	}
};
