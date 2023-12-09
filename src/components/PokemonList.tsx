'use client';

import { useState } from 'react';

import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';

export const PokemonList = () => {
	const [pokemons, setPokemons] = useState<number[]>([]);

	const addPokemon = () => {
		setPokemons(pokemons => [...pokemons, Math.floor(Math.random() * 900)]);
	};

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
			{pokemons.map(pokemonId => (
				<PokemonCardWrapper pokemonId={pokemonId} key={pokemonId} />
			))}
			{pokemons.length < 6 && (
				<button className="btn btn-ghost" onClick={() => addPokemon()}>
					+ Add random Pokémon
				</button>
			)}
		</div>
	);
};
