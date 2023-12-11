import { type Metadata } from 'next';
import { Suspense } from 'react';

import { TeamList } from '@/components/TeamList';
import { StaticCard } from '@/components/StaticCard';
import { Spinner } from '@/components/spinner';
import TeamCreateButton from '@/components/TeamCreateButton';

export const metadata: Metadata = {
	title: 'Team list'
};

const ListTeamsPage = () => (
	<div className="m-2 flex justify-center lg:flex-row">
		<div className="flex w-full max-w-3xl flex-col gap-4">
			<TeamCreateButton />
			<Suspense fallback={<Spinner />}>
				<TeamList />
			</Suspense>
		</div>
	</div>
);

export default ListTeamsPage;
