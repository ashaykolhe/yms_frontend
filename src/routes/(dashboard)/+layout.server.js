import { deserialize } from '$app/forms';
import { Channel } from '$lib/server/models/channel.model.js';
import { Video } from '$lib/server/models/video.model';

export const load = async ({ locals, url }) => {
	console.log('locals useremail ' + locals.useremail);
	// let columns = '_id title description status domain userCreatedBy createdAt';
	// let longVideos = await Video.find({ softDelete: false, type: 'long', archived: false }, columns);

	// console.log('load ' + longVideos);
	// let todos = deserialize(videos);
	let channels = await Channel.find({ softDelete: false, archived: false });

	console.log(url.pathname);
	return {
		isAdmin: locals.isAdmin,
		username: locals.username,
		useremail: locals.useremail,
		// pathname: url.pathname.substring(1).toUpperCase(),
		channels: JSON.parse(JSON.stringify(channels))
		// longVideos: JSON.parse(JSON.stringify(longVideos))
	};
};
