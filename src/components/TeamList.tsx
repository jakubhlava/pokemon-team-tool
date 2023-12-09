import { getServerSession } from 'next-auth';

import { authOptions } from '@/server/auth';
import { db } from '@/server/db';
import { type TeamWithPokemons } from '@/types/team';
import { TeamCard } from '@/components/TeamCard';

export const TeamList = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (session === null) {
			return <p>You need to be logged in to see your teams</p>;
		}

		const teams: TeamWithPokemons[] = await db.team.findMany({
			where: {
				userId: {
					equals: session?.user.id
				}
			},
			include: {
				TeamPokemon: {
					include: {
						pokemon: true
					}
				}
			}
		});

		return (
			<>
				{teams.length === 0 && (
					<p>You don&apos;t have any teams yet...</p>
				)}

				{teams.map(team => (
					<TeamCard team={team} key={team.id} />
				))}
			</>
		);
	} catch (error) {
		return <p>Something went wrong</p>;
	}
};
