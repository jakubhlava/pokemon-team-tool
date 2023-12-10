import Link from 'next/link';

import { PokemonApi } from '@/pokemon/pokeapi';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';
import { type TeamWithPokemons } from '@/types/team';
import { TeamDeleteButton } from '@/components/TeamDeleteButton';

type TeamCardProps = {
	team: TeamWithPokemons;
};

export const TeamCard = async ({ team }: TeamCardProps) => {
	const pokemons = await Promise.all(
		team.TeamPokemon.map(async teamPokemon => ({
			pokemon: await PokemonApi.pokemon.getPokemonByName(
				teamPokemon.pokemon.nameId
			),
			specie: await PokemonApi.pokemon.getPokemonSpeciesByName(
				teamPokemon.pokemon.nameId
			)
		}))
	);
	return (
		<div className="group/delete flex cursor-pointer rounded-2xl bg-white/60 shadow-xl backdrop-blur transition-all duration-500 hover:bg-white/70 active:scale-[99%]">
			<Link href={`/team/${team.id}`} className=" w-full">
				<div className="group-item/delete flex flex-col gap-4  px-8 py-4 xl:py-4 2xl:px-8">
					<div className="flex flex-row items-center justify-between">
						<h2 className="text-lg font-bold text-emerald-900">{team.name}</h2>
					</div>
					{team.description !== null && <p>{team.description}</p>}
					<div className="flex">
						{pokemons.map((pokemon, index) => (
							<div
								className="group relative hover:z-50"
								key={pokemon.pokemon.id}
							>
								<div className="-mx-1 flex h-14 w-14 justify-center rounded-full border border-emerald-400 bg-emerald-200/50 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:scale-125 md:-mx-2 md:h-16 md:w-16 lg:h-24 lg:w-24">
									<img
										src={pokemon.pokemon.sprites.front_default ?? ''}
										alt={pokemon.pokemon.name}
									/>
								</div>
								<div
									className={`absolute -bottom-24 z-50 block origin-top scale-y-0 flex-col gap-2 rounded-2xl border border-emerald-100 bg-white p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100 ${
										index < pokemons.length / 2 ? 'left-0' : 'right-0'
									}`}
								>
									<span className="font-semibold">
										{pokemon.specie.names.find(
											specie => specie.language.name === 'en'
										)?.name ?? pokemon.pokemon.name}
									</span>
									<div className="flex h-6 gap-4">
										{pokemon.pokemon.types.map(type => (
											<PokemonTypeBadge
												type={type.type.name}
												key={type.type.name}
											/>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Link>
			<div className="group-item/delete w-20 rounded-r-xl bg-red-400 transition-all duration-500 hover:bg-red-600 lg:w-0 lg:opacity-0 lg:group-hover/delete:w-20 lg:group-hover/delete:opacity-100">
				<TeamDeleteButton teamId={team.id} />
			</div>
		</div>
	);
};
