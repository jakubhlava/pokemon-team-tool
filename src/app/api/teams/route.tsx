import { authOptions } from '@/server/auth';
import { db } from '@/server/db';
import { getServerSession } from 'next-auth';

export const GET = async (_: Request) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	try {
		const user = session.user;

		const teams = await db.team.findMany({
			where: {
				userId: {
					equals: user.id
				}
			}
		});

		return new Response(JSON.stringify(teams), { status: 200 });
	} catch (e) {
		return new Response(JSON.stringify('Something went wrong.'), {
			status: 500
		});
	}
};
