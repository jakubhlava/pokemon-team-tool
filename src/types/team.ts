import type z from 'zod';
import { type Prisma } from '@prisma/client';

import { type teamForm, type teamSchema } from '@/validators/team';

export type TeamFormValues = z.infer<typeof teamForm>;

export type Team = z.infer<typeof teamSchema>;

export type TeamWithPokemons = Prisma.TeamGetPayload<{
	include: {
		TeamPokemon: {
			include: {
				pokemon: true;
			};
		};
	};
}>;
