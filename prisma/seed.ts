import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Creating a User
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john@example.com',
			emailVerified: new Date(),
			image: 'https://example.com/john.jpg'
		}
	});

	// Creating a Pokemon
	const pokemon = await prisma.pokemon.create({
		data: {
			api_id: 1,
			name: 'Bulbasaur',
			typeOne: 'Grass',
			typeTwo: 'Poison'
		}
	});

	// Creating a Team
	const team = await prisma.team.create({
		data: {
			name: 'Team Alpha',
			userId: user.id,
			description: 'A powerful team of Pokemons',
			TeamPokemon: {
				create: [
					{
						pokemonId: pokemon.id
					}
				]
			}
		},
		include: {
			TeamPokemon: true // Include TeamPokemon in the result
		}
	});

	console.log('Test data created:', { user, pokemon, team });
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
