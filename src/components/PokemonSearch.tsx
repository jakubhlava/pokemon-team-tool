import { Suspense } from 'react';

import { useSearchState } from '@/context/searchContext';

import { PokemonSearchResults } from './PokemonSearchResults';

export const PokemonSearch = () => {
	const [inputValue, setInputValue] = useSearchState();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const value = e.target.value;
		setInputValue(value);
	};

	return (
		<div className="group relative z-[200] w-full">
			<input
				onChange={handleChange}
				value={inputValue}
				className="group input w-full rounded-2xl border-emerald-900 bg-white/60 placeholder-black shadow-xl"
				placeholder="Search by Pokémon name and click on result to add to team"
			/>

			<div className="absolute top-12 mt-2 hidden max-h-80 w-full overflow-y-auto rounded-2xl border-emerald-900 bg-white/80 p-2 shadow-xl backdrop-blur group-focus-within:block">
				<Suspense fallback={<span>Loading...</span>}>
					<PokemonSearchResults query={inputValue} />
				</Suspense>
			</div>
		</div>
	);
};
