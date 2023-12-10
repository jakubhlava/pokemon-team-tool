'use client';

import { TeamEditProvider } from '@/context/teamEditContext';
import { type TeamWithPokemons } from '@/types/team';

import { PokemonList } from './PokemonList';
import { PokemonSearch } from './PokemonSearch';

type TeamEditSectionProps = {
	team: TeamWithPokemons;
};

export const TeamEditSection = ({ team }: TeamEditSectionProps) => (
	<TeamEditProvider team={team}>
		<PokemonSearch />
		<PokemonList />
	</TeamEditProvider>
);
