import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';

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

		await db.teamPokemon.deleteMany({
			where: {
				teamId: id
			}
		});

		await db.team.delete({
			where: {
				id,
				userId: user.id
			}
		});

		return new Response(JSON.stringify(id), { status: 200 });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Failed to delete the team.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};
