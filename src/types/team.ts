import type z from 'zod';
import {teamForm, teamSchema} from "@/validators/team";
import {Prisma} from "@prisma/client";

export type TeamFormValues = z.infer<typeof teamForm>;

export type Team = z.infer<typeof teamSchema>

export type TeamWithPokemons = Prisma.TeamGetPayload<{
	include: {
		TeamPokemon: {
			include: {
				pokemon: true
			}
		},
	}
}>
