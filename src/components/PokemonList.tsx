'use client';

import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { type TeamPokemon, type Pokemon, type Team } from '@prisma/client';

import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';
import { teamPokemonSchema } from '@/validators/team';

type PokemonListProps = {
	team: Team;
};

export const PokemonList = ({ team }: PokemonListProps) => {
	const [pokemons, setPokemons] = useState<string[]>([]);
	const pokemonToAdd = useRef<HTMLInputElement>(null);

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
			setPokemons(pokemons => [...pokemons, teamPokemon.pokemon.nameId]);
		}
	});

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
			{pokemons.map(pokemonName => (
				<PokemonCardWrapper pokemonName={pokemonName} key={pokemonName} />
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
