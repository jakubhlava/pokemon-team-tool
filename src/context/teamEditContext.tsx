import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';

import {
	type TeamPokemonWithPokemon,
	type TeamWithPokemons
} from '@/types/team';

type TeamEditState = {
	team: TeamWithPokemons;
	state: [
		TeamPokemonWithPokemon[],
		Dispatch<SetStateAction<TeamPokemonWithPokemon[]>>
	];
};

const TeamEditContext = createContext<TeamEditState>(undefined as never);

type TeamEditProviderProps = {
	team: TeamWithPokemons;
} & PropsWithChildren;

export const TeamEditProvider = ({ team, children }: TeamEditProviderProps) => {
	const teamState = useState<TeamPokemonWithPokemon[]>([]);
	const [_, setPokemons] = teamState;

	useEffect(() => {
		setPokemons(team.TeamPokemon);
	});

	const state = {
		team,
		state: teamState
	};

	return (
		<TeamEditContext.Provider value={state}>
			{children}
		</TeamEditContext.Provider>
	);
};

export const useTeamEditState = () => useContext(TeamEditContext);
