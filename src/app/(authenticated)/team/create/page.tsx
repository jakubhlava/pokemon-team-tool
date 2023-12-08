'use client';

import { PokemonCard } from '@/components/PokemonCard';
import { Suspense, useState } from 'react';
import { Card } from '@/components/Card';
import { PokemonSearch } from '@/components/PokemonSearch';

const CreateTeamPage = () => {
	const [pokemons, setPokemons] = useState<number[]>([]);

	const addPokemon = () => {
		setPokemons(pokemons => [...pokemons, Math.floor(Math.random() * 900)]);
	};

	return (
		<div className="flex flex-col p-4 xl:flex-row 2xl:gap-8">
			<div className="flex flex-col gap-4 xl:basis-3/5">
				<PokemonSearch />
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
			</div>
			<div className="flex flex-col gap-4 xl:basis-2/5">
				<Card>
					<h1 className="text-2xl font-semibold text-emerald-900">
						Stats analysis
					</h1>
				</Card>
				<Card>
					<p>Něco něco, nevim</p>
					<p>Tabulka, něco</p>
					<p>Dobrej tým 👍, cg</p>
				</Card>
			</div>
		</div>
	);
};

export default CreateTeamPage;
