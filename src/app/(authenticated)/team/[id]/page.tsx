import { type Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { StaticCard } from '@/components/StaticCard';
import { db } from '@/server/db';
import TeamEditButton from '@/components/TeamEditButton';
import { TeamEditSection } from '@/components/TeamEditSection';
import { TeamStatistics } from '@/components/TeamStatistics';
import { getServerAuthSession } from '@/server/auth';

export const metadata: Metadata = {
	title: 'Team edit'
};

const TeamDetailPage = async ({ params }: { params: { id: string } }) => {
	const status = await getServerAuthSession();

	if (!status) {
		redirect('/');
	}

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
			<div className="order-last flex flex-col gap-4 xl:order-first xl:col-span-3">
				<TeamEditSection team={team} />
			</div>
			<div className="flex flex-col gap-4 xl:col-span-2">
				<StaticCard>
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<h1 className="text-4xl font-bold text-emerald-900">
								{team.name}
							</h1>
							<TeamEditButton team={team} />
						</div>

						{team.description && (
							<p className="text-lg text-gray-700">{team.description}</p>
						)}
					</div>
				</StaticCard>
				<TeamStatistics teamId={team.id} />
			</div>
		</div>
	);
};

export default TeamDetailPage;
