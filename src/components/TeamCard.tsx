import { Card } from '@/components/Card';
import { PokemonApi } from '@/pokemon/pokeapi';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';

type TeamCardProps = {
	team: MockTeam;
};

export const TeamCard = async ({ team }: TeamCardProps) => {
	const pokemons = await Promise.all(
		team.pokemon.map(async pokemon => {
			return {
				pokemon: await PokemonApi.pokemon.getPokemonById(pokemon),
				specie: await PokemonApi.pokemon.getPokemonSpeciesById(pokemon)
			};
		})
	);
	return (
		<Card hoverable={true} clickable={true}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-lg font-bold text-emerald-900">{team.name}</h2>
					<button className="btn btn-circle btn-error btn-sm text-white">
						<i className="bi bi-trash"></i>
					</button>
				</div>
				{team.description !== null && <p>{team.description}</p>}
				<div className="flex">
					{pokemons.map((pokemon, index) => (
						<div className="group relative hover:z-50" key={pokemon.pokemon.id}>
							<div className="-mx-1 flex h-14 w-14 justify-center rounded-full border border-emerald-400 bg-emerald-200/50 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:scale-125 md:-mx-2 md:h-16 md:w-16 lg:h-24 lg:w-24">
								<img
									src={pokemon.pokemon.sprites.front_default ?? ''}
									alt={pokemon.pokemon.name}
								/>
							</div>
							<div
								className={
									'absolute -bottom-24 z-50 hidden flex-col gap-2 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl transition-all duration-500 group-hover:flex ' +
									(index < pokemons.length / 2 ? 'left-0' : 'right-0')
								}
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
		</Card>
	);
};
