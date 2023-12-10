import { getServerSession } from 'next-auth';
import { Prisma, type Team, type Pokemon } from '@prisma/client';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';

export const POST = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	const { id } = params;

	let team, pokemon;

	try {
		const user = session.user;

		team = await db.team.findUnique({
			where: {
				id
			},
			include: {
				TeamPokemon: {
					include: {
						pokemon: true
					}
				}
			}
		});

		if (!team || team.userId !== user.id) {
			return new Response(JSON.stringify('Team not found.'), {
				status: 404
			});
		}
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Team not found.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}

	const { pokemonName } = await req.json();

	if (!pokemonName) {
		return new Response(
			JSON.stringify('Missing required pokemonName attribute.'),
			{
				status: 400
			}
		);
	}

	try {
		pokemon = await db.pokemon.findFirst({
			where: {
				nameId: pokemonName
			}
		});

		if (!pokemon) {
			return new Response(JSON.stringify('Pokemon not found'), { status: 404 });
		}
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Pokemon not found.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}

	if (team.TeamPokemon.length >= 6) {
		return new Response(JSON.stringify('Team is full.'), {
			status: 400
		});
	}

	if (team.TeamPokemon.find(p => p.pokemonId === pokemonName)) {
		return new Response(JSON.stringify('Pokemon already in team.'), {
			status: 400
		});
	}

	try {
		const teamPokemon = await db.teamPokemon.create({
			data: {
				teamId: id,
				pokemonId: pokemon.id
			},
			include: {
				pokemon: true
			}
		});

		return new Response(JSON.stringify(teamPokemon), {
			status: 200
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Pokemon not found.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};
