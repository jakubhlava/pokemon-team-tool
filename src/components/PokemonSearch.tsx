import { useState, Suspense } from 'react';

import { PokemonSearchResults } from './PokemonSearchResults';

export const PokemonSearch = () => {
	const [showResults, setShowResults] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const value = e.target.value;
		setInputValue(value);
		setShowResults(value.length > 0);
	};

	const handleFocus = () => {
		setShowResults(inputValue.length > 0);
	};

	return (
		<div className="w-full px-2 py-2 xl:px-16 xl:py-8">
			<input
				onChange={handleChange}
				onBlur={() => setShowResults(false)}
				onFocus={handleFocus}
				className="input w-full rounded-2xl border-emerald-900 bg-white/60 placeholder-black shadow-xl"
				placeholder="Search by Pokémon name"
			/>

			{showResults && (
				<div className="mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border-emerald-900 bg-white/60 p-2 shadow-xl">
					<Suspense fallback={<span>Loading...</span>}>
						<PokemonSearchResults query={inputValue} />
					</Suspense>
				</div>
			)}
		</div>
	);
};
