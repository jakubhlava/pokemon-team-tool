import { type Metadata } from 'next';
import Link from 'next/link';

import { PokemonSearch } from '@/components/PokemonSearch';
import { PokemonList } from '@/components/PokemonList';
import { StaticCard } from '@/components/StaticCard';
import { db } from '@/server/db';

export const metadata: Metadata = {
	title: 'Create team'
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
		<div className="flex flex-col p-4 xl:flex-row xl:gap-8">
			<div className="flex flex-col gap-4 xl:basis-3/5">
				<PokemonSearch />
				<PokemonList team={team} />
			</div>
			<div className="flex flex-col gap-4 xl:basis-2/5">
				<StaticCard>
					<h1 className="text-2xl font-semibold text-emerald-900">
						Stats analysis
					</h1>
				</StaticCard>
				<StaticCard>
					<p>Něco něco, nevim</p>
					<p>Tabulka, něco</p>
					<p>Dobrej tým 👍, cg</p>
				</StaticCard>
			</div>
		</div>
	);
};

export default TeamDetailPage;
