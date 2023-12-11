import React, { useState, useEffect } from 'react';

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
};

export const PokemonSearchResults = ({ query }: PokemonSearchResultProps) => {
	const [results, setResults] = useState<SearchPokemon[]>([]);

	useEffect(() => {
		const fetchResults = async () => {
			if (query.length > 0) {
				const data = await getResults(query);
				setResults(data);
			}
		};

		fetchResults();
	}, [query]);

	if (query.length === 0) {
		return (
			<div className="flex flex-row justify-center">
				<span className="p-2 text-center text-xl font-bold">
					Start typing to see results...
				</span>
			</div>
		);
	}

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
		<PokemonSearchResult key={index} pokemonData={pokemonData} />
	));
};
