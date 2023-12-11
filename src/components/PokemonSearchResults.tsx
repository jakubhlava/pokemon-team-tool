import React, { useState, useEffect } from 'react';

import { type SearchPokemon } from '@/types/search_pokemon';
import { ToastError } from '@/toasts/Error';
import { ToastWarning } from '@/toasts/Warning';

import { PokemonSearchResult } from './PokemonSearchResult';

const getResults = async (query: string) => {
	const res = await fetch(`/api/pokemon?query=${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) {
		if (res.status.toString().startsWith('5')) {
			ToastError.fire({
				title: `${res.status} ${res.statusText}`,
				icon: 'error'
			});
		}
		if (res.status.toString().startsWith('4')) {
			ToastWarning.fire({
				title: `${res.status} ${res.statusText}`,
				icon: 'warning'
			});
		}
	}

	const data = (await res.json()) as SearchPokemon[];

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
