import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Video } from '$lib/server/models/video.model';
import { Domain } from '$lib/server/models/domain.model';
import { Status } from '$lib/server/models/videoStatus.model';

export const GET: RequestHandler = async ({ url }) => {
	console.log('url ' + url.searchParams);
	const type = url.searchParams.get('type');
	if (type === 'A') {
		const channelId = url.searchParams.get('channelId');
		let columns = '_id title description userCreatedBy createdAt';
		let domain = await Status.find(
			{ softDelete: false, archived: false, channelId: channelId },
			columns
		).sort({ createdAt: -1 });
		return json(domain);
	} else if (type === 'E') {
		const id = url.searchParams.get('id');
		let domain = await Status.findById(id);
		console.log('domain ' + domain);
		return json(domain);
	}
	return json({});
};
