import { PokemonClient } from 'pokenode-ts';
import { PokemonApi } from '@/pokemon/pokeapi';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';

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
	const moves = await Promise.all(
		pokemon.moves.map(async move => {
			return await PokemonApi.move.getMoveByName(move.move.name);
		})
	);

	const specie = await PokemonApi.pokemon.getPokemonSpeciesByName(
		pokemon.species.name
	);
	return (
		<div className="rounded-2xl bg-gradient-to-r from-sky-200/30 to-teal-300/30 px-2 py-2 shadow-xl backdrop-blur transition-all duration-500 hover:translate-y-0.5 hover:bg-white/30 xl:py-4 2xl:px-8">
			<div className="flex flex-col gap-4">
				<div className="flex w-full gap-4">
					<img
						src={pokemon.sprites.front_default ?? ''}
						alt={`Front sprite of ${pokemon.name}`}
						className="w-1/7 flex-none"
					/>
					<div className="flex w-full flex-col gap-2">
						<span className="text-2xl font-bold uppercase text-emerald-50 xl:text-3xl">
							{specie.names.find(name => name.language.name === 'en')?.name ??
								pokemon.name}
						</span>
						<div className="flex h-6 gap-4">
							{pokemon.types.map(type => (
								<PokemonTypeBadge type={type.type.name} key={type.type.name} />
							))}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<select
						className="select select-sm border-emerald-900 bg-emerald-700/40 text-white"
						defaultValue="empty"
						onChange={() => {}}
					>
						<option value="empty" disabled>
							Attack 1
						</option>
						{moves.map(async move => {
							return (
								<option key={move.name} value={move.name}>
									{move.names.find(name => name.language.name === 'en')?.name ??
										move.name}
								</option>
							);
						})}
					</select>
					<select
						className="select select-sm border-emerald-900 bg-emerald-700/40 text-white"
						defaultValue="empty"
						onChange={() => {}}
					>
						<option value="empty" disabled>
							Attack 2
						</option>
						{moves.map(async move => {
							return (
								<option key={move.name} value={move.name}>
									{move.names.find(name => name.language.name === 'en')?.name ??
										move.name}
								</option>
							);
						})}
					</select>
					<select
						className="select select-sm border-emerald-900 bg-emerald-700/40 text-white"
						defaultValue="empty"
						onChange={() => {}}
					>
						<option value="empty" disabled>
							Attack 3
						</option>
						{moves.map(async move => {
							return (
								<option key={move.name} value={move.name}>
									{move.names.find(name => name.language.name === 'en')?.name ??
										move.name}
								</option>
							);
						})}
					</select>
					<select
						className="select select-sm border-emerald-900 bg-emerald-700/40 text-white"
						defaultValue="empty"
						onChange={() => {}}
					>
						<option value="empty" disabled>
							Attack 4
						</option>
						{moves.map(async move => {
							return (
								<option key={move.name} value={move.name}>
									{move.names.find(name => name.language.name === 'en')?.name ??
										move.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
		</div>
	);
};
