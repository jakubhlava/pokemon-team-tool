'use client';
import { useQuery } from '@tanstack/react-query';

import { StaticCard } from '@/components/StaticCard';
import { Spinner } from '@/components/spinner';
import {
	type StatisticEntry,
	StatisticEntryArraySchema
} from '@/server/statisticsService';

const useTeamStatistics = (id: string) =>
	useQuery<StatisticEntry[]>({
		queryKey: ['team-statistics', id],
		queryFn: async () => {
			const res = await fetch(`/api/team/${id}/statistics`);
			return StatisticEntryArraySchema.parseAsync(await res.json());
		}
	});

type TeamStatisticsProps = {
	teamId: string;
};

export const TeamStatistics = ({ teamId }: TeamStatisticsProps) => {
	const { data, isLoading, isError } = useTeamStatistics(teamId);

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
		<StaticCard>
			<h2 className="text-2xl font-semibold text-emerald-900">
				Stats analysis
			</h2>
			{data?.map(stat => (
				<p className="text-l font-semibold text-emerald-900">
					{stat.type === 'warning' ? (
						<i className="bi bi-exclamation-triangle-fill" />
					) : (
						<i className="bi bi-check-circle-fill" />
					)}{' '}
					{stat.message}
				</p>
			))}
		</StaticCard>
	);
};
