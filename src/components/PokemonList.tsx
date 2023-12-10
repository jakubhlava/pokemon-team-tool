'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { type TeamPokemon, type Pokemon, type Team } from '@prisma/client';

import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';
import { teamPokemonSchema } from '@/validators/team';
import {
	type TeamPokemonWithPokemon,
	type TeamWithPokemons
} from '@/types/team';

type PokemonListProps = {
	team: TeamWithPokemons;
};

export const PokemonList = ({ team }: PokemonListProps) => {
	const [pokemons, setPokemons] = useState<TeamPokemonWithPokemon[]>([]);
	const pokemonToAdd = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setPokemons(team.TeamPokemon);
	});

	const addPokemon = async () => {
		await mutation.mutateAsync(pokemonToAdd.current?.value ?? '');
	};

	const mutation = useMutation({
		mutationFn: async (pokemonName: string) => {
			const res = await fetch(`/api/team/${team.id}/pokemon`, {
				method: 'POST',
				body: JSON.stringify({ pokemonName })
			});

			return await teamPokemonSchema.parseAsync(await res.json());
		},
		onSuccess: async (teamPokemon: TeamPokemon & { pokemon: Pokemon }) => {
			setPokemons(pokemons => [...pokemons, teamPokemon]);
		}
	});

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
			{pokemons.map(pokemon => (
				<PokemonCardWrapper
					teamPokemonId={pokemon.id}
					pokemonName={pokemon.pokemon.nameId}
					key={pokemon.pokemonId}
				/>
			))}
			{pokemons.length < 6 && (
				<div>
					<input type="text" className="input input-sm" ref={pokemonToAdd} />
					<button
						className="btn btn-circle btn-ghost"
						onClick={() => addPokemon()}
						disabled={mutation.isPending}
					>
						{mutation.isPending ? (
							<span className="loading loading-spinner loading-sm" />
						) : (
							<i className="bi bi-plus" />
						)}
					</button>
				</div>
			)}
		</div>
	);
};
