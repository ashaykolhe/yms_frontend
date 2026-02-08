import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Prompt } from '$lib/server/models/prompt.model';

export const GET: RequestHandler = async ({ url }) => {
	console.log('url ' + url.searchParams);
	const type = url.searchParams.get('type');
	if (type === 'A') {
		const channelId = url.searchParams.get('channelId');
		let columns = '_id title prompt userCreatedBy createdAt';
		let prompt = await Prompt.find(
			{ softDelete: false, archived: false, channelId: channelId },
			columns
		).sort({ createdAt: -1 });
		return json(prompt);
	} else if (type === 'E') {
		const id = url.searchParams.get('id');
		let prompt = await Prompt.findById(id);
		console.log('prompt ' + prompt);
		return json(prompt);
	}
	return json({});
};
