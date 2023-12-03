import { Card } from '@/components/Card';
import { TeamCard } from '@/components/TeamCard';

const ListTeamsPage = () => {
	const teams: MockTeam[] = [
		{
			name: 'Team 1',
			pokemon: [1, 2, 3, 4, 5, 6],
			description: 'Tým 1 je nejlepší tým'
		},
		{
			name: 'Team 2',
			pokemon: [7, 8, 9]
		}
	];
	return (
		<div className="m-2 flex flex-col gap-8 lg:m-8 lg:flex-row">
			<div className="lg:basis-2/5">
				<Card>
					<h1 className="text-2xl font-semibold text-emerald-900">
						Team preview
					</h1>
					Tady bude detail po rozkliknutí a tak... Asi
				</Card>
			</div>
			<div className="flex flex-col gap-4 lg:basis-3/5">
				<TeamCard team={teams[0]}></TeamCard>
				<TeamCard team={teams[1]}></TeamCard>
			</div>
		</div>
	);
};

export default ListTeamsPage;
