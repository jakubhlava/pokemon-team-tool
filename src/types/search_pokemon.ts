import { type z } from 'zod';

import { type searchPokemonSchema } from '@/validators/search_pokemon';

export type SearchPokemon = z.infer<typeof searchPokemonSchema>;
