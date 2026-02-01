import { deserialize } from '$app/forms';
import { Video } from '$lib/server/models/video.model';

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
