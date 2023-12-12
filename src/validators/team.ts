import z from 'zod';

export const teamForm = z.object({
	name: z.string().min(1, 'Team name is required'),
	description: z.string().optional().nullable()
});

export const teamSchema = teamForm.extend({
	id: z.string()
});

export const teamPokemonSchema = z.object({
	id: z.string(),
	pokemonId: z.string(),
	teamId: z.string(),
	moveOneId: z.string().nullable(),
	moveTwoId: z.string().nullable(),
	moveThreeId: z.string().nullable(),
	moveFourId: z.string().nullable()
});

export const teamPokemonWithPokemonSchema = teamPokemonSchema.extend({
	pokemon: z.object({
		id: z.string(),
		name: z.string(),
		nameId: z.string(),
		typeOne: z.string(),
		typeTwo: z.string().nullable()
	})
});
