'use client';

import { PokemonCard } from '@/components/PokemonCard';
import { Suspense, useState } from 'react';
import { Card } from '@/components/Card';

const CreateTeamPage = () => {
	const [pokemons, setPokemons] = useState<number[]>([]);

	const addPokemon = () => {
		setPokemons(pokemons => [...pokemons, Math.floor(Math.random() * 900)]);
	};

	return (
		<div className="flex flex-col xl:flex-row 2xl:gap-4 ">
			<div className="flex flex-col gap-4 xl:basis-3/5">
				<div className="w-full px-2 py-2 xl:px-16 xl:py-8">
					<input
						className="input w-full border-emerald-900 bg-white/60 placeholder-black shadow-xl"
						placeholder="Search by Pokémon name"
					></input>
				</div>
				<div className="grid grid-cols-1 gap-4 p-4 2xl:grid-cols-2">
					{pokemons.map(pokemonId => (
						<Suspense
							key={pokemonId}
							fallback={<div>Loading pokemon {pokemonId}...</div>}
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
			<div className="flex flex-col gap-4 p-2 xl:basis-2/5 xl:p-8">
				<Card>
					<h1 className="text-2xl font-semibold text-emerald-50">
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
