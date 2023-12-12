import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';
import { type TeamWithPokemons } from '@/types/team';

type PokemonListProps = {
	team: TeamWithPokemons;
};

export const PokemonList = ({ team }: PokemonListProps) => (
	<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
		{team.TeamPokemon.map(pokemon => (
			<PokemonCardWrapper teamPokemon={pokemon} key={pokemon.pokemonId} />
		))}
	</div>
);
