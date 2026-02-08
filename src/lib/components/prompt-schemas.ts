import { z } from 'zod/v4';

export const schema = z.object({
	_id: z.string(),
	title: z.string(),
	prompt: z.string().nullable().optional(),
	userCreatedBy: z.string().nullable().optional(),
	createdAt: z.string().nullable().optional()
});

export type PromptSchema = z.infer<typeof schema>;
