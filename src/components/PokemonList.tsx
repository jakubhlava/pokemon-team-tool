'use client';

import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';
import { useTeamEditState } from '@/context/teamEditContext';

export const PokemonList = () => {
	const teamEditState = useTeamEditState();
	const [pokemons, _] = teamEditState.state;

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
			{pokemons.map(pokemon => (
				<PokemonCardWrapper
					teamPokemonId={pokemon.id}
					pokemonName={pokemon.pokemon.nameId}
					key={pokemon.pokemonId}
				/>
			))}
		</div>
	);
};
