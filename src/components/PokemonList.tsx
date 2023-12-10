'use client';

import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';
import {useTeamEditState} from "@/context/teamEditContext";

export const PokemonList = () => {
	const teamEditState = useTeamEditState();
    const [pokemons, setPokemons] = teamEditState.state;

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
			{pokemons.map(pokemonName => (
                <PokemonCardWrapper pokemonName={pokemonName} key={pokemonName} />
			))}
			{pokemons.length < 6 && (
				<button className="btn btn-ghost" onClick={() => addPokemon()}>
					+ Add random Pokémon
				</button>
			)}
		</div>
	);
};
