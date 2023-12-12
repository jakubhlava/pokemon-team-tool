import { Suspense } from 'react';

import { PokemonApi } from '@/pokemon/pokeapi';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';
import { PokemonAttackSelection } from '@/components/PokemonAttackSelection';
import { PokemonDeleteButton } from '@/components/PokemonDeleteButton';
import { type TeamPokemonWithPokemon } from '@/types/team';

export type PokemonCardProps = {
	teamPokemon: TeamPokemonWithPokemon;
};

export const PokemonCardContent = async ({ teamPokemon }: PokemonCardProps) => {
	const pokemon = await PokemonApi.pokemon.getPokemonByName(
		teamPokemon.pokemon.nameId ?? ''
	);

	const specie = await PokemonApi.pokemon.getPokemonSpeciesByName(
		pokemon.species?.name
	);
	return (
		<div className="flex flex-col gap-4">
			<div className="flex w-full gap-4">
				<img
					src={pokemon.sprites.front_default ?? ''}
					alt={`Front sprite of ${pokemon.name}`}
					className="w-1/7 flex-none"
				/>
				<div className="flex w-full flex-col gap-2">
					<span className="text-2xl font-bold uppercase text-emerald-800 xl:text-3xl">
						{specie.names.find(name => name.language.name === 'en')?.name ??
							pokemon.name}
					</span>
					<div className="flex h-6 gap-4">
						{pokemon.types.map(type => (
							<PokemonTypeBadge type={type.type.name} key={type.type.name} />
						))}
					</div>
				</div>
				<PokemonDeleteButton teamPokemonId={teamPokemon.id} />
			</div>
			<Suspense
				fallback={
					<div className="flex h-full w-full items-center justify-center">
						<span className="loading loading-dots loading-md" />
					</div>
				}
			>
				<PokemonAttackSelection pokemon={pokemon} teamPokemon={teamPokemon} />
			</Suspense>
		</div>
	);
};
