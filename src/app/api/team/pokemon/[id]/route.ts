import { getServerSession } from 'next-auth';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';

export const PATCH = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {};

export const DELETE = async (
	req: Request,
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
