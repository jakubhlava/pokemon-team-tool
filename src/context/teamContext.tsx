import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';

import { type TeamWithPokemons } from '@/types/team';

type TeamState = [TeamWithPokemons, (team: TeamWithPokemons) => void];

const TeamContext = createContext<TeamState>(undefined as never);

type TeamProviderProps = {
	team: TeamWithPokemons;
} & PropsWithChildren;

export const TeamProvider = ({ team, children }: TeamProviderProps) => {
	const state = useState<TeamWithPokemons>(undefined as never);
	const [_, setTeamState] = state;

	useEffect(() => {
		setTeamState(team);
	});

	return <TeamContext.Provider value={state}>{children}</TeamContext.Provider>;
};

export const useTeam = () => useContext(TeamContext);
