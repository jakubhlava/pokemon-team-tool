'use client';

import { TeamEditProvider } from '@/context/teamEditContext';
import { type TeamWithPokemons } from '@/types/team';
import { SearchContextProvider } from '@/context/searchContext';
import { DisabledSearchContextProvider } from '@/context/disabledSearchContext';

import { PokemonList } from './PokemonList';
import { PokemonSearch } from './PokemonSearch';

type TeamEditSectionProps = {
	team: TeamWithPokemons;
};

export const TeamEditSection = ({ team }: TeamEditSectionProps) => (
	<TeamEditProvider team={team}>
		<DisabledSearchContextProvider>
			<SearchContextProvider>
				<PokemonSearch />
			</SearchContextProvider>
			<PokemonList team={team} />
		</DisabledSearchContextProvider>
	</TeamEditProvider>
);
