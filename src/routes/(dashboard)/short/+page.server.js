import { deserialize } from '$app/forms';
import { Video } from '$lib/server/models/video.model';

export const load = async ({ locals }) => {
	console.log(locals);
	let columns = '_id title description status domain userCreatedBy createdAt';
	const shortVideos = await Video.find(
		{ softDelete: false, type: 'short', archived: false },
		columns
	);

	// let todos = deserialize(videos);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail,
		shortVideos: JSON.parse(JSON.stringify(shortVideos))
	};
};
