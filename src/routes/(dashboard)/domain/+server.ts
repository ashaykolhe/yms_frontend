import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Domain } from '$lib/server/models/domain.model';

export const GET: RequestHandler = async ({ url }) => {
	console.log('url ' + url.searchParams);
	const type = url.searchParams.get('type');
	if (type === 'A') {
		const channelId = url.searchParams.get('channelId');
		console.log('channelId channelId ' + channelId);
		let columns = '_id title description userCreatedBy createdAt';
		let domain = await Domain.find(
			{ softDelete: false, archived: false, channelId: channelId },
			columns
		).sort({ createdAt: -1 });
		console.log('domain domain ' + domain);
		return json(domain);
	} else if (type === 'E') {
		const id = url.searchParams.get('id');
		let domain = await Domain.findById(id);
		console.log('domain ' + domain);
		return json(domain);
	}
	return json({});
};
