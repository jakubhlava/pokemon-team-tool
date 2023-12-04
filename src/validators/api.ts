import z from 'zod';

export const teamCreateSchema = z.object({
	name: z.string(),
});
