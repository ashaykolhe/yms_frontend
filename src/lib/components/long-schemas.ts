import { z } from 'zod/v4';

export const schema = z.object({
	_id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
	userCreatedBy: z.string(),
	createdAt: z.string(),
	domain: z.string()
});

export type LongSchema = z.infer<typeof schema>;
