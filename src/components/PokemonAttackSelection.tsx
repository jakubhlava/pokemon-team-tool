import { type Move, type Pokemon } from 'pokenode-ts';

import { AttackSelect } from '@/components/AttackSelect';
import { PokemonApi } from '@/pokemon/pokeapi';

type PokemonAttackSelectionProps = {
	pokemon: Pokemon;
	teamPokemonId: string;
};

export const PokemonAttackSelection = async ({
	pokemon,
	teamPokemonId
}: PokemonAttackSelectionProps) => {
	const moves = await Promise.all(
		pokemon.moves.map(
			async move => await PokemonApi.move.getMoveByName(move.move.name)
		)
	);

	const onMoveOneChange = async (move: Move) => {
		await fetch(`/api/team/pokemon/${teamPokemonId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				moveOneId: move.id
			})
		});
	};

	const onMoveTwoChange = async (move: Move) => {
		await fetch(`/api/team/pokemon/${teamPokemonId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				moveTwoId: move.id
			})
		});
	};

	const onMoveThreeChange = async (move: Move) => {
		await fetch(`/api/team/pokemon/${teamPokemonId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				moveThreeId: move.id
			})
		});
	};

	const onMoveFourChange = async (move: Move) => {
		await fetch(`/api/team/pokemon/${teamPokemonId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				moveFourId: move.id
			})
		});
	};

	const response = await fetch(`/api/team/pokemon/${teamPokemonId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const fetchedPokemon = await response.json();

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<AttackSelect
				onChange={onMoveOneChange}
				attacks={moves}
				presetMove={
					fetchedPokemon.moveOneId &&
					(await PokemonApi.move.getMoveById(fetchedPokemon.moveOneId))
				}
			>
				Select attack 1
			</AttackSelect>
			<AttackSelect
				onChange={onMoveTwoChange}
				attacks={moves}
				presetMove={
					fetchedPokemon.moveTwoId &&
					(await PokemonApi.move.getMoveById(fetchedPokemon.moveTwoId))
				}
			>
				Select attack 2
			</AttackSelect>
			<AttackSelect
				onChange={onMoveThreeChange}
				attacks={moves}
				presetMove={
					fetchedPokemon.moveThreeId &&
					(await PokemonApi.move.getMoveById(fetchedPokemon.moveThreeId))
				}
			>
				Select attack 3
			</AttackSelect>
			<AttackSelect
				onChange={onMoveFourChange}
				attacks={moves}
				presetMove={
					fetchedPokemon.moveFourId &&
					(await PokemonApi.move.getMoveById(fetchedPokemon.moveFourId))
				}
			>
				Select attack 4
			</AttackSelect>
		</div>
	);
};
