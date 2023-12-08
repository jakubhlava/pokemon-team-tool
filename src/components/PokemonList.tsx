'use client';

import { Suspense, useState } from 'react';
import { Card } from '@/components/Card';
import { PokemonCard } from '@/components/PokemonCard';

export const PokemonList = () => {
	const [pokemons, setPokemons] = useState<number[]>([]);

	const addPokemon = () => {
		setPokemons(pokemons => [...pokemons, Math.floor(Math.random() * 900)]);
	};

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
			{pokemons.map(pokemonId => (
				<Suspense
					key={pokemonId}
					fallback={
						<Card>
							<div className="flex items-center justify-center">
								<span className="text-xl font-bold">Loading Pokémon</span>
							</div>
						</Card>
					}
				>
					<PokemonCard pokemonId={pokemonId} />
				</Suspense>
			))}
			{pokemons.length < 6 && (
				<button className="btn btn-ghost" onClick={() => addPokemon()}>
					+ Add random Pokémon
				</button>
			)}
		</div>
	);
};
