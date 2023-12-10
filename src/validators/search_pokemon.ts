import { z } from 'zod';

export const searchPokemonSchema = z.object({
	name: z.string(),
	nameId: z.string(),
	typeOne: z.string(),
	typeTwo: z.string().optional()
});
