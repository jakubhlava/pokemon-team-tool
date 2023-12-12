import { type Pokemon } from 'pokenode-ts';
import { type TeamPokemon } from '@prisma/client';

import { AttackSelect } from '@/components/AttackSelect';
import { PokemonApi } from '@/pokemon/pokeapi';

type PokemonAttackSelectionProps = {
	pokemon: Pokemon;
	teamPokemon: TeamPokemon;
};

export const PokemonAttackSelection = async ({
	pokemon,
	teamPokemon
}: PokemonAttackSelectionProps) => {
	const moves = await Promise.all(
		pokemon.moves.map(
			async move => await PokemonApi.move.getMoveByName(move.move.name)
		)
	);

	const getMove = (moveId: string | null | undefined) => {
		if (!moveId) return null;
		return moves.find(move => move.name === moveId);
	};

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<AttackSelect
				attacks={moves}
				presetMove={getMove(teamPokemon.moveOneId)}
				teamPokemonId={teamPokemon.id}
				teamPokemonOrder="moveOne"
			>
				Select attack 1
			</AttackSelect>
			<AttackSelect
				attacks={moves}
				presetMove={getMove(teamPokemon?.moveTwoId)}
				teamPokemonId={teamPokemon.id}
				teamPokemonOrder="moveTwo"
			>
				Select attack 2
			</AttackSelect>
			<AttackSelect
				attacks={moves}
				presetMove={getMove(teamPokemon?.moveThreeId)}
				teamPokemonId={teamPokemon.id}
				teamPokemonOrder="moveThree"
			>
				Select attack 3
			</AttackSelect>
			<AttackSelect
				attacks={moves}
				presetMove={getMove(teamPokemon?.moveFourId)}
				teamPokemonId={teamPokemon.id}
				teamPokemonOrder="moveFour"
			>
				Select attack 4
			</AttackSelect>
		</div>
	);
};
