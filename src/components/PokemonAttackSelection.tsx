import { type Pokemon } from 'pokenode-ts';

import { AttackSelect } from '@/components/AttackSelect';
import { PokemonApi } from '@/pokemon/pokeapi';

type PokemonAttackSelectionProps = {
	pokemon: Pokemon;
};

export const PokemonAttackSelection = async ({
	pokemon
}: PokemonAttackSelectionProps) => {
	const moves = await Promise.all(
		pokemon.moves.map(
			async move => await PokemonApi.move.getMoveByName(move.move.name)
		)
	);

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<AttackSelect onChange={() => null} attacks={moves}>
				Select attack 1
			</AttackSelect>
			<AttackSelect onChange={() => null} attacks={moves}>
				Select attack 2
			</AttackSelect>
			<AttackSelect onChange={() => null} attacks={moves}>
				Select attack 3
			</AttackSelect>
			<AttackSelect onChange={() => null} attacks={moves}>
				Select attack 4
			</AttackSelect>
		</div>
	);
};
