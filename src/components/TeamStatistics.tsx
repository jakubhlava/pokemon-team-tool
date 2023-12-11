import { useQuery } from '@tanstack/react-query';

import { useTeamEditState } from '@/context/teamEditContext';
import { StaticCard } from '@/components/StaticCard';
import { Spinner } from '@/components/spinner';

const useTeamStatistics = (id: string) =>
	useQuery({
		queryKey: ['team-statistics', id],
		queryFn: async () => {
			const res = await fetch(`/api/team/${id}/statistics`);
			return res.json();
		}
	});

export const TeamStatistics = () => {
	const teamEditState = useTeamEditState();

	const { data, isLoading, isError } = useTeamStatistics(teamEditState.team.id);

	if (isError) {
		return (
			<StaticCard>
				<p className="text-xl text-red-700">Error loading statistics :/</p>
			</StaticCard>
		);
	}

	if (isLoading) {
		return (
			<StaticCard>
				<Spinner />
			</StaticCard>
		);
	}

	return (
		<>
			<StaticCard>
				<h1 className="text-2xl font-semibold text-emerald-900">
					Stats analysis
				</h1>
			</StaticCard>
			<StaticCard>
				<p>juch</p>
			</StaticCard>
		</>
	);
};
