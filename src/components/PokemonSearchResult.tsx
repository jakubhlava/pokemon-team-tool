import { type Dispatch, type SetStateAction } from 'react';

import { type SearchPokemon } from '@/types/search_pokemon';

import PokemonTypeBadge from './PokemonTypeBadge';

type PokemonSearchResultProps = {
	pokemonData: SearchPokemon;
	pokemons: string[];
	setPokemons: Dispatch<SetStateAction<string[]>>;
};

export const PokemonSearchResult = ({
	pokemonData,
	pokemons,
	setPokemons
}: PokemonSearchResultProps) => {
	const handleAddPokemon = async () => {
		setPokemons([...pokemons, pokemonData.nameId]);
	};

	return (
		<div className="flex items-center justify-between">
			<button
				onClick={handleAddPokemon}
				className="flex w-full items-center justify-between rounded-2xl border-ghost p-2 hover:bg-white/40"
			>
				<span className="text-xl font-bold">
					{pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}
				</span>
				<div className="flex gap-2">
					<PokemonTypeBadge type={pokemonData.typeOne} />
					{pokemonData.typeTwo && (
						<PokemonTypeBadge type={pokemonData.typeTwo} />
					)}
				</div>
			</button>
		</div>
	);
};
