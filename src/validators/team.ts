import z from 'zod';

export const teamForm = z.object({
	name: z.string().min(1, 'Team name is required'),
	description: z.string().optional(),
});