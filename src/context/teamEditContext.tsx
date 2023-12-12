'use client';

import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Pokemon, type TeamPokemon } from '@prisma/client';
import { useRouter } from 'next/navigation';

import {
	type TeamPokemonWithPokemon,
	type TeamWithPokemons
} from '@/types/team';
import { teamPokemonWithPokemonSchema } from '@/validators/team';

type TeamEditState = {
	team: TeamWithPokemons;
	state: [
		TeamPokemonWithPokemon[],
		Dispatch<SetStateAction<TeamPokemonWithPokemon[]>>
	];
	addPokemon: (pokemonNameId: string) => Promise<void>;
	getPokemonCount: () => Promise<number>;
};

const TeamEditContext = createContext<TeamEditState>(undefined as never);

type TeamEditProviderProps = {
	team: TeamWithPokemons;
} & PropsWithChildren;

export const TeamEditProvider = ({ team, children }: TeamEditProviderProps) => {
	const teamState = useState<TeamPokemonWithPokemon[]>([]);
	const [_, setPokemons] = teamState;
	const router = useRouter();

	const queryClient = useQueryClient();

	useEffect(() => {
		setPokemons(team.TeamPokemon);
	});

	const addPokemon = async (pokemonNameId: string) => {
		await mutation.mutateAsync(pokemonNameId);
	};

	const getPokemonCount = async () => {
		const res = await fetch(`/api/team/${team.id}`);
		return await res.json().then(data => data.TeamPokemon.length);
	};

	const mutation = useMutation({
		mutationFn: async (pokemonName: string) => {
			const res = await fetch(`/api/team/${team.id}/pokemon`, {
				method: 'POST',
				body: JSON.stringify({ pokemonName })
			});

			return await teamPokemonWithPokemonSchema.parseAsync(await res.json());
		},
		onSuccess: async (teamPokemon: TeamPokemon & { pokemon: Pokemon }) => {
			setPokemons(pokemons => [...pokemons, teamPokemon]);

			await queryClient.invalidateQueries({
				queryKey: ['team-statistics']
			});

			router.refresh();
		}
	});

	const state = {
		team,
		state: teamState,
		addPokemon,
		getPokemonCount
	};

	return (
		<TeamEditContext.Provider value={state}>
			{children}
		</TeamEditContext.Provider>
	);
};

export const useTeamEditState = () => useContext(TeamEditContext);
