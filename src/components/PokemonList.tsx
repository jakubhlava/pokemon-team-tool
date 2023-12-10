'use client';

import { PokemonCardWrapper } from '@/components/PokemonCardWrapper';

type PokemonListProps = {
	pokemons: string[];
};

export const PokemonList = ({ pokemons }: PokemonListProps) => (
	<div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
		{pokemons.map(pokemonId => (
			<PokemonCardWrapper key={pokemonId} />
		))}
	</div>
);
