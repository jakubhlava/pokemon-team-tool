import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';
import { computeStatistics } from '@/server/statisticsService';

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
		const teamPokemon = await db.teamPokemon.findMany({
			where: {
				teamId: id
			}
		});

		const statistics = await computeStatistics(teamPokemon);

		return new Response(JSON.stringify(statistics), { status: 200 });
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
};
