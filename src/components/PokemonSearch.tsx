import { Suspense, useEffect } from 'react';

import { useSearchState } from '@/context/searchContext';
import { useDisabledSearchState } from '@/context/disabledSearchContext';
import { useTeamEditState } from '@/context/teamEditContext';

import { PokemonSearchResults } from './PokemonSearchResults';

export const PokemonSearch = () => {
	const [inputValue, setInputValue] = useSearchState();
	const [isDisabled, setDisabled] = useDisabledSearchState();
	const teamEditState = useTeamEditState();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const value = e.target.value;
		setInputValue(value);
	};

	useEffect(() => {
		const getPokemonCount = async () => {
			const count = await teamEditState.getPokemonCount();
			if (count === 6) {
				setDisabled(true);
			}
		};
		getPokemonCount();
	}, []);

	return (
		<div className="group relative z-[200] w-full">
			<input
				onChange={handleChange}
				value={inputValue}
				disabled={isDisabled}
				className="group input w-full rounded-2xl border-emerald-900 bg-white/60 placeholder-black shadow-xl"
				placeholder={`${
					isDisabled
						? "Can't have more than 6 pokemon in a team"
						: 'Search by Pokémon name and click on result to add to team'
				}`}
			/>

			<div className="absolute top-12 mt-2 hidden max-h-80 w-full overflow-y-auto rounded-2xl border-emerald-900 bg-white/80 p-2 shadow-xl backdrop-blur group-focus-within:block">
				<Suspense fallback={<span>Loading...</span>}>
					<PokemonSearchResults query={inputValue} />
				</Suspense>
			</div>
		</div>
	);
};
