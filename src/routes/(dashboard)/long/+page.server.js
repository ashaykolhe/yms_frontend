import { deserialize } from '$app/forms';
import { Video } from '$lib/server/models/video.model';
import { VideoVersionHistory } from '$lib/server/models/videoVersionHistory.model.js';
import { formBody } from '$lib/server/utils.js';
import { json } from '@sveltejs/kit';

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
		const title = data.title;
		const description = data.description;
		console.log('addNewLongVideo title ' + title + ' addNewLongVideo description ' + description);
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
			// return json({ success: true, message: 'Long Video Added Successfully.' });
		} catch (error) {
			// return json({ success: true, message: error.message });
		}
		// const hashedPassword = await bcrypt.hash(password, 10);
		// console.log(hashedPassword);
		// const user = await User.findOne({
		// 	email: email
		// }).exec();

		// if (user) {
		// 	console.log('user ' + user);
		// 	const match = await bcrypt.compare(password, user.password);
		// 	if (match) {
		// 		try {
		// 			let token = jwt.sign(
		// 				{
		// 					userId: user._id,
		// 					isAdmin: user.isAdmin,
		// 					email: user.email,
		// 					name: user.name
		// 				},
		// 				SECRET_JWT_KEY,
		// 				{ expiresIn: '12h' }
		// 			);
		// 			cookies.set('auth-token', token, cookie_options);
		// 		} catch (err) {
		// 			return error(400, { message: err.message });
		// 		}
		// 		throw redirect(301, '/long');
		// 	}
		// }
		// return fail(400, { email, message: 'Invalid username/email or password' });
	}
};
