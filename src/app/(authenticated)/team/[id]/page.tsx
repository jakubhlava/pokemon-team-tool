import { type Metadata } from 'next';
import Link from 'next/link';

import { StaticCard } from '@/components/StaticCard';
import { db } from '@/server/db';
import TeamEditButton from '@/components/TeamEditButton';
import { TeamEditSection } from '@/components/TeamEditSection';

export const metadata: Metadata = {
	title: 'Team edit'
};

const TeamDetailPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const team = await db.team.findUnique({
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

	if (!team) {
		return (
			<div className="p-4">
				<StaticCard>
					<div className="flex flex-col gap-4">
						<span className="text-3xl font-bold">Oh no!</span>
						<span className="text-xl font-bold">
							It looks like this team does not exist ☹️
						</span>
						<p>
							You can go{' '}
							<Link className="font-bold text-emerald-700" href="/team/list">
								back to the team list
							</Link>{' '}
							and try it again.
						</p>
					</div>
				</StaticCard>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 p-2 xl:grid-cols-5 xl:gap-8 xl:p-4">
			<TeamEditSection team={team} />
		</div>
	);
};

export default TeamDetailPage;
