import { deserialize } from '$app/forms';
import { Prompt } from '$lib/server/models/prompt.model';

import { formBody } from '$lib/server/utils.js';
import { error, fail, json } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log('locals useremail ' + locals.useremail);
	// let columns = '_id title description prompt Prompt userCreatedBy createdAt';
	// let Prompts = await Prompt.find({ softDelete: false, type: 'long', archived: false }, columns);

	// console.log('load ' + Prompts);
	// let todos = deserialize(videos);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail
		// Prompts: JSON.parse(JSON.stringify(Prompts))
	};
};

export const actions = {
	addNewPrompt: async ({ request, locals }) => {
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
		if (!data.prompt) {
			return fail(400, { returndata: data, error: true, message: 'Prompt must be present' });
			// return { error: true, message: 'Title must be present' };
		}
		// const description = data.description;
		// console.log('addNewPrompt title ' + title + ' addNewPrompt description ' + description);
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

			const prompt = await Prompt.create(data);
			console.log(prompt);
			return { success: true, message: `You created ${prompt.title} prompt` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
			// return { error: true, message: err.message };
			// return error(400, { message: err.message });
		}
	},
	editPrompt: async ({ request, locals }) => {
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

			let prompt = await Prompt.findByIdAndUpdate(data._id, data, {
				new: true
			});
			if (!prompt) {
				return fail(400, { returndata: data, error: true, message: 'Prompt not found.' });
			}
			return { success: true, message: `You updated ${prompt.title} prompt` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
		}
	},
	permanentDeletePrompt: async ({ request, locals }) => {
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
			// const prompt = await Prompt.findByIdAndDelete(id);
			const result = await Prompt.deleteMany({
				_id: { $in: idsArray }
			});

			return {
				success: true,
				message:
					result.deletedCount + `Prompt${result.deletedCount > 1 ? 's' : ''} deleted permanently`
			};
		} catch (error) {
			return fail(500, { error: true, message: error.message });
		}
	}
};
