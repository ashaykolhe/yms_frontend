import { deserialize } from '$app/forms';
import { Video } from '$lib/server/models/video.model';
import { VideoVersionHistory } from '$lib/server/models/videoVersionHistory.model.js';
import { formBody } from '$lib/server/utils.js';
import { error, fail, json } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log('locals useremail ' + locals.useremail);
	// let columns = '_id title description status domain userCreatedBy createdAt';
	// let longVideos = await Video.find({ softDelete: false, type: 'long', archived: false }, columns);

	// console.log('load ' + longVideos);
	// let todos = deserialize(videos);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail
		// longVideos: JSON.parse(JSON.stringify(longVideos))
	};
};

export const actions = {
	addNewLongVideo: async ({ request, locals }) => {
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
		// console.log('addNewLongVideo title ' + title + ' addNewLongVideo description ' + description);
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

			const video = await Video.create(data);
			console.log(video);
			// const temp = video;
			// delete temp._id;
			// temp['parentVideoId'] = video._id;
			// // temp['channelId'] = video.channelId;
			// VideoVersionHistory.create(temp);
			let newVideo = { ...video._doc };
			newVideo['parentVideoId'] = newVideo._id;
			delete newVideo._id;
			VideoVersionHistory.create(newVideo);
			return { success: true, message: `You created ${video.title} long video` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
			// return { error: true, message: err.message };
			// return error(400, { message: err.message });
		}
	},
	editLongVideo: async ({ request, locals }) => {
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

			let video = await Video.findByIdAndUpdate(data._id, data, {
				new: true
			});
			if (!video) {
				return fail(400, { returndata: data, error: true, message: 'Video not found.' });
			}
			let newVideo = { ...video._doc };
			newVideo['parentVideoId'] = newVideo._id;
			delete newVideo._id;
			VideoVersionHistory.create(newVideo);
			return { success: true, message: `You updated ${video.title} long video` };
		} catch (err) {
			return fail(500, { returndata: data, error: true, message: err.message });
		}
	},
	permanentDeleteLongVideo: async ({ request, locals }) => {
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
			// const video = await Video.findByIdAndDelete(id);
			const result = await Video.deleteMany({
				_id: { $in: idsArray }
			});

			return {
				success: true,
				message:
					result.deletedCount + `Video${result.deletedCount > 1 ? 's' : ''} deleted permanently`
			};
		} catch (error) {
			return fail(500, { error: true, message: error.message });
		}
	}
};
