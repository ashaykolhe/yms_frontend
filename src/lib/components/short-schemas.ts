import { z } from 'zod/v4';

export const schema = z.object({
	_id: z.string(),
	title: z.string(),
	description: z.string().nullable().optional(),
	status: z.string().nullable().optional(),
	userCreatedBy: z.string().nullable().optional(),
	createdAt: z.string().nullable().optional(),
	domain: z.string().nullable().optional()
});

export type ShortSchema = z.infer<typeof schema>;
