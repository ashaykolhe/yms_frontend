import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Video } from '$lib/server/models/video.model';

export const GET: RequestHandler = async ({ url }) => {
	console.log('url ' + url.searchParams);
	const type = url.searchParams.get('type');
	if (type === 'A') {
		const channelId = url.searchParams.get('channelId');
		let columns = '_id title description status domain userCreatedBy createdAt';
		let shortVideos = await Video.find(
			{ softDelete: false, type: 'short', archived: false, channelId: channelId },
			columns
		).sort({ createdAt: -1 });
		return json(shortVideos);
	} else if (type === 'E') {
		const id = url.searchParams.get('id');
		const type = url.searchParams.get('type');
		let editVideo = await Video.findById(id);
		console.log('editVideo ' + editVideo);
		return json(editVideo);
	}
	return json({});
};
