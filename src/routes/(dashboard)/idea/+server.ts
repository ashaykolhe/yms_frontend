import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Idea } from '$lib/server/models/idea.model';

export const GET: RequestHandler = async ({ url }) => {
	console.log('url ' + url.searchParams);
	const type = url.searchParams.get('type');
	if (type === 'A') {
		const channelId = url.searchParams.get('channelId');
		let columns = '_id title idea userCreatedBy createdAt';
		let idea = await Idea.find(
			{ softDelete: false, archived: false, channelId: channelId },
			columns
		).sort({ createdAt: -1 });
		return json(idea);
	} else if (type === 'E') {
		const id = url.searchParams.get('id');
		let idea = await Idea.findById(id);
		console.log('idea ' + idea);
		return json(idea);
	}
	return json({});
};
