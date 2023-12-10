'use client';

import { useState } from 'react';

import { PokemonList } from './PokemonList';
import { PokemonSearch } from './PokemonSearch';

export const TeamEditSection = () => {
	const [pokemons, setPokemons] = useState<string[]>([]);

	return (
		<>
			<PokemonSearch pokemons={pokemons} setPokemons={setPokemons} />
			<PokemonList pokemons={pokemons} />
		</>
	);
};
