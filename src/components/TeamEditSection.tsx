'use client';

import { TeamEditProvider } from '@/context/teamEditContext';
import { type TeamWithPokemons } from '@/types/team';
import { SearchContextProvider } from '@/context/searchContext';

import { PokemonList } from './PokemonList';
import { PokemonSearch } from './PokemonSearch';

type TeamEditSectionProps = {
	team: TeamWithPokemons;
};

export const TeamEditSection = ({ team }: TeamEditSectionProps) => (
	<TeamEditProvider team={team}>
		<SearchContextProvider>
			<PokemonSearch />
		</SearchContextProvider>
		<PokemonList team={team} />
	</TeamEditProvider>
);
