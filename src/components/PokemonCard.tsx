import { PokemonClient } from 'pokenode-ts';
import { PokemonApi } from '@/pokemon/pokeapi';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';
import { Card } from '@/components/Card';
import { AttackSelect } from '@/components/AttackSelect';
import { PokemonAttackSelection } from '@/components/PokemonAttackSelection';
import { Suspense } from 'react';

type PokemonCardProps = {
	pokemonName?: string;
	pokemonId?: number;
};

export const PokemonCard = async ({
	pokemonName,
	pokemonId
}: PokemonCardProps) => {
	const pokemon =
		pokemonName != null
			? await PokemonApi.pokemon.getPokemonByName(pokemonName)
			: await PokemonApi.pokemon.getPokemonById(pokemonId ?? 0);

	// TODO: Rozdělit do víc komponent, aby se loadovaly attacky zvlášť a pokemon už byl na screenu

	const specie = await PokemonApi.pokemon.getPokemonSpeciesByName(
		pokemon.species.name
	);
	return (
		<Card hoverable={true}>
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
					<button className="btn btn-circle btn-error btn-sm text-white">
						<i className="bi bi-trash"></i>
					</button>
				</div>
				<Suspense
					fallback={
						<div className="flex h-full w-full items-center justify-center">
							<span className="loading loading-dots loading-md"></span>
						</div>
					}
				>
					<PokemonAttackSelection pokemon={pokemon} />
				</Suspense>
			</div>
		</Card>
	);
};
