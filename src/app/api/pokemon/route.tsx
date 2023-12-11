import { getServerSession } from 'next-auth';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';

export const GET = async (req: Request) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized.'), { status: 401 });
	}

	try {
		const url = new URL(req.url, `http://${req.headers.get('host')}`);
		const searchQuery = url.searchParams.get('query');

		if (!searchQuery) {
			return new Response(JSON.stringify('No search query provided.'), {
				status: 400
			});
		}

		const teams = await db.pokemon.findMany({
			where: {
				name: {
					contains: searchQuery,
					mode: 'insensitive'
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
