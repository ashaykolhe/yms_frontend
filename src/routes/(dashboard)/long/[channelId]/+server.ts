import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { Video } from '$lib/server/models/video.model';

export const GET: RequestHandler = async ({ params }) => {
	console.log('params ' + params);
	const { channelId } = params;
	console.log('GET ' + channelId);
	let columns = '_id title description status domain userCreatedBy createdAt';
	let longVideos = await Video.find(
		{ softDelete: false, type: 'long', archived: false, channelId: channelId },
		columns
	).sort({ createdAt: -1 });
	return json(longVideos);
};
