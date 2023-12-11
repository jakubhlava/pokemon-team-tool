import { getServerSession } from 'next-auth';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';
import { type PokemonMoveDto } from '@/types/pokemon_move_dto';

export const PATCH = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	const { id } = params;

	if (!req.body) {
		return new Response(JSON.stringify('No body.'), { status: 400 });
	}

	const moveDto = (await req.json()) as PokemonMoveDto;

	try {
		const pokemon = await db.teamPokemon.update({
			where: {
				id
			},
			data: {
				moveOneId: moveDto.moveOneId?.toString(),
				moveTwoId: moveDto.moveTwoId?.toString(),
				moveThreeId: moveDto.moveThreeId?.toString(),
				moveFourId: moveDto.moveFourId?.toString()
			}
		});

		if (!pokemon) {
			return new Response(JSON.stringify('Pokemon not found.'), {
				status: 404
			});
		}

		return new Response(JSON.stringify(id), { status: 200 });
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Pokemon instance not found.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};

export const GET = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	const { id } = params;

	try {
		const pokemon = await db.teamPokemon.findFirst({
			where: {
				id
			}
		});

		if (!pokemon) {
			return new Response(JSON.stringify('Pokemon not found.'), {
				status: 404
			});
		}

		return new Response(JSON.stringify(pokemon), { status: 200 });
	} catch (e) {
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};

export const DELETE = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	const { id } = params;

	try {
		const user = session.user;
		await db.teamPokemon.delete({
			where: {
				id,
				team: {
					userId: user.id
				}
			}
		});
		return new Response(JSON.stringify(id), { status: 200 });
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Pokemon instance not found.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};
