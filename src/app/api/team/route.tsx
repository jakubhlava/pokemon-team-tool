import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import { teamCreateSchema, teamUpdateSchema } from '@/validators/api';
import { db } from '@/server/db';
import { Prisma } from '@prisma/client';

export const POST = async (req: Request) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	try {
		const user = session.user;
		const data = await teamCreateSchema.parseAsync(await req.json());

		const newTeam = await db.team.create({
			data: {
				...data,
				userId: user.id
			}
		});

		return new Response(JSON.stringify(newTeam), { status: 201 });
	} catch (e) {
		if (e instanceof SyntaxError) {
			return new Response(JSON.stringify('Invalid JSON.'), {
				status: 400
			});
		}
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Failed to create the team.'), {
				status: 400
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};

export const PUT = async (req: Request) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	try {
		const user = session.user;

		const data = await teamUpdateSchema.parseAsync(await req.json());

		await db.team.update({
			where: {
				id: data.id,
				userId: user.id
			},
			data: {
				...data
			}
		});

		return new Response(null, { status: 204 });
	} catch (e) {
		if (e instanceof SyntaxError) {
			return new Response(JSON.stringify('Invalid JSON.'), {
				status: 400
			});
		}
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return new Response(JSON.stringify('Failed to update the team.'), {
				status: 404
			});
		}
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};

