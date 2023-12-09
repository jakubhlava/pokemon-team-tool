import { PrismaClient } from '@prisma/client';

import { PokemonApi } from '../src/pokemon/pokeapi';

const prisma = new PrismaClient();

const isSkippable = (pokemonName: string): boolean => {
	const exceptions = [
		'maushold',
		'squawkabilly',
		'palafin',
		'tatsugiri',
		'gimmighoul',
		'dudunsparce',
		'floette',
		'miraidon',
		'koraidon',
		'pikachu-'
	];

	let matched = false;
	exceptions.forEach(exception => {
		if (pokemonName.startsWith(exception)) {
			matched = true;
		}
	});

	if (
		pokemonName.endsWith('-mega') ||
		pokemonName.endsWith('-mega-x') ||
		pokemonName.endsWith('-mega-y') ||
		pokemonName.endsWith('-gmax')
	) {
		matched = true;
	}

	return matched;
};

const addPokemonData = async () => {
	const limit = 20;
	let offset = 0;

	// eslint-disable-next-line no-constant-condition
	while (true) {
		try {
			const response = await PokemonApi.pokemon.listPokemons(offset, limit);
			const allPokemon = response.results;
			allPokemon.forEach(async pokemon => {
				if (isSkippable(pokemon.name)) {
					return;
				}

				const pokeInfo = await PokemonApi.pokemon
					.getPokemonByName(pokemon.name)
					.then(response => ({
						types: response.types,
						forms: response.forms,
						species: response.species.name
					}));

				const speciesInfo = await PokemonApi.pokemon
					.getPokemonSpeciesByName(pokeInfo.species)
					.then(response => ({
						engName: response.names.find(name => name.language.name === 'en'),
						varieties: response.varieties
					}));

				speciesInfo.varieties = speciesInfo.varieties
					.filter(v => !v.pokemon.name.endsWith('-gmax'))
					.filter(v => !v.pokemon.name.endsWith('-mega'))
					.filter(v => !v.pokemon.name.endsWith('-mega-x'))
					.filter(v => !v.pokemon.name.endsWith('-mega-y'));

				if (
					speciesInfo.varieties.length === 1 ||
					speciesInfo.varieties[0].pokemon.name === 'pikachu' ||
					pokeInfo.forms.length > 1
				) {
					await prisma.pokemon
						.create({
							data: {
								name: speciesInfo.engName!.name,
								nameId: pokemon.name,
								typeOne: pokeInfo.types[0].type.name,
								typeTwo: pokeInfo.types[1]?.type.name
							}
						})
						.catch(e => {
							console.error('Duplicate value DEBUG:', pokemon.name);
							throw e;
						});
					return;
				}

				speciesInfo.varieties.forEach(async varieties => {
					const formInfo = await PokemonApi.pokemon
						.getPokemonFormByName(varieties.pokemon.name)
						.then(response => ({
							formName: response.names.find(name => name.language.name === 'en')
								?.name,
							types: response.types
						}));

					if (formInfo.formName === undefined) {
						return;
					}

					await prisma.pokemon
						.create({
							data: {
								name: formInfo.formName,
								nameId: varieties.pokemon.name,
								typeOne: formInfo.types[0].type.name,
								typeTwo: formInfo.types[1]?.type.name
							}
						})
						.catch(_ => {
							console.error('Duplicate value:', varieties.pokemon.name);
						});
				});
			});

			if (response.results.length < limit) {
				break;
			}

			offset += limit;
		} catch (error) {
			console.error('Error fetching Pokémon:', error);
			break;
		}
	}
};

const main = async () => {
	// adding a user
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john@example.com',
			emailVerified: new Date(),
			image: 'https://example.com/john.jpg'
		}
	});

	// adding Pokemon
	await addPokemonData();

	// adding teams
	const team1Pokemon = await prisma.pokemon.findMany({
		where: {
			OR: [
				{
					nameId: 'charmander'
				},
				{
					nameId: 'squirtle'
				},
				{
					nameId: 'pikachu'
				}
			]
		}
	});

	await prisma.team.create({
		data: {
			name: 'Team Alpha',
			userId: user.id,
			description: 'A powerful team of Pokemons',
			TeamPokemon: {
				create: [
					{
						pokemonId: team1Pokemon[0].id
					},
					{
						pokemonId: team1Pokemon[1].id
					},
					{
						pokemonId: team1Pokemon[2].id
					}
				]
			}
		},
		include: {
			TeamPokemon: true // Include TeamPokemon in the result
		}
	});

	console.log('Test data created.');
};

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
