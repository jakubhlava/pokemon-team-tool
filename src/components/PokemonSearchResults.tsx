import React, {
	useState,
	useEffect,
	type Dispatch,
	type SetStateAction
} from 'react';

import { type SearchPokemon } from '@/types/search_pokemon';

import { PokemonSearchResult } from './PokemonSearchResult';

const getResults = async (query: string) => {
	const result = await fetch(`/api/pokemon?query=${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const data = (await result.json()) as SearchPokemon[];

	return data;
};

type PokemonSearchResultProps = {
	query: string;
	pokemons: string[];
	setPokemons: Dispatch<SetStateAction<string[]>>;
};

export const PokemonSearchResults = ({
	query,
	pokemons,
	setPokemons
}: PokemonSearchResultProps) => {
	const [results, setResults] = useState<SearchPokemon[]>([]);

	useEffect(() => {
		const fetchResults = async () => {
			const data = await getResults(query);
			setResults(data);
		};

		fetchResults();
	}, [query]);

	if (results.length === 0) {
		return (
			<div className="flex flex-row justify-center">
				<span className="p-2 text-center text-xl font-bold">
					No results found
				</span>
			</div>
		);
	}

	return results.map((pokemonData, index) => (
		<PokemonSearchResult
			key={index}
			pokemonData={pokemonData}
			pokemons={pokemons}
			setPokemons={setPokemons}
		/>
	));
};
