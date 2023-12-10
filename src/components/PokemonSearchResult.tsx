import { useMutation } from '@tanstack/react-query';
import { type Pokemon, type TeamPokemon } from '@prisma/client';

import { type SearchPokemon } from '@/types/search_pokemon';
import { useTeamEditState } from '@/context/teamEditContext';
import { teamPokemonSchema } from '@/validators/team';
import { useTeam } from '@/context/teamContext';

import PokemonTypeBadge from './PokemonTypeBadge';

type PokemonSearchResultProps = {
	pokemonData: SearchPokemon;
};

export const PokemonSearchResult = ({
	pokemonData
}: PokemonSearchResultProps) => {
	const teamEditState = useTeamEditState();
	const [_, setPokemons] = teamEditState.state;
	const [team, __] = useTeam();

	const handleAddPokemon = async () => {
		await mutation.mutateAsync(pokemonData.nameId);
	};

	const mutation = useMutation({
		mutationFn: async (pokemonName: string) => {
			const res = await fetch(`/api/team/${team.id}/pokemon`, {
				method: 'POST',
				body: JSON.stringify({ pokemonName })
			});

			return await teamPokemonSchema.parseAsync(await res.json());
		},
		onSuccess: async (teamPokemon: TeamPokemon & { pokemon: Pokemon }) => {
			setPokemons(pokemons => [...pokemons, teamPokemon]);
		}
	});

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
