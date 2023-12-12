import { type TeamPokemon } from '.prisma/client';
import { z } from 'zod';

import { PokemonApi } from '@/pokemon/pokeapi';
import { effectiveness, types } from '@/server/effectivenesMatrix';

export const StatisticEntrySchema = z.object({
	type: z.union([z.literal('warning'), z.literal('info')]),
	message: z.string()
});

export const StatisticEntryArraySchema = z.array(StatisticEntrySchema);

export type StatisticEntry = z.infer<typeof StatisticEntrySchema>;

export const computeStatistics = async (pokemons: TeamPokemon[]) => {
	const statistics: StatisticEntry[] = [];

	if (pokemons.length === 6) {
		statistics.push({
			type: 'info',
			message: 'Your team is complete.'
		});
	} else {
		statistics.push({
			type: 'warning',
			message: 'Your team is not complete. Optimal team has to have 6 pokemon.'
		});

		//return statistics;
	}

	statistics.push(...(await computeBalance(pokemons)));

	return statistics;
};

const computeBalance = async (pokemons: TeamPokemon[]) => {
	const statistics: StatisticEntry[] = [];

	const moves = pokemons
		.map(pokemon => [
			pokemon.moveOneId,
			pokemon.moveTwoId,
			pokemon.moveThreeId,
			pokemon.moveFourId
		])
		.flat()
		.filter((value, index, self) => self.indexOf(value) === index)
		.filter((item): item is string => item !== null);

	const moveTypes = await getMoveTypes(moves);
	const effectiveAgainst = getEffectiveAgainst(moveTypes);

	const notEffectiveAgainst = types.filter(
		type => !effectiveAgainst.includes(type)
	);

	notEffectiveAgainst.forEach(type => {
		statistics.push({
			type: 'warning',
			message: `Your team has no moves effective against ${type} type pokemons.`
		});
	});

	if (statistics.length === 0) {
		statistics.push({
			type: 'info',
			message:
				'Your team is well balanced. There is at least one move effective against every pokemon type.'
		});
	}

	return statistics;
};

const getMoveTypes = async (moves: string[]) =>
	(
		await Promise.all(
			moves.map(async moveString => {
				const move = await PokemonApi.move.getMoveByName(moveString);

				return move.type.name;
			})
		)
	).filter((value, index, self) => self.indexOf(value) === index);

const getEffectiveAgainst = (attackerTypes: string[]) => {
	const effectiveAgainst: string[] = [];

	attackerTypes.forEach(attackerType => {
		const effectivenessData = effectiveness[attackerType];

		for (const key in effectivenessData) {
			if (effectivenessData[key] > 1) {
				effectiveAgainst.push(key);
			}
		}
	});

	return effectiveAgainst;
};
