import z from 'zod';

export const teamCreateSchema = z.object({
	name: z.string()
});

export const teamUpdateSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable().optional()
});
