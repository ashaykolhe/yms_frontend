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
		// console.log(formdata);
		let data = formBody(formdata);
		// console.log('formbody');
		// console.log(data);
		// const title = data.title;
		// const description = data.description;
		// console.log('addNewLongVideo title ' + title + ' addNewLongVideo description ' + description);
		try {
			data.userCreatedBy = locals.useremail;
			data.userUpdatedBy = locals.useremail;
			// console.log(data);
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
			// return fail(400, { success: false, message: err.message });
			return { error: true, message: err.message };
			// return error(400, { message: err.message });
		}
	}
};
