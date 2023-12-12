import { type Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { TeamList } from '@/components/TeamList';
import { Spinner } from '@/components/spinner';
import TeamCreateButton from '@/components/TeamCreateButton';
import { getServerAuthSession } from '@/server/auth';

export const metadata: Metadata = {
	title: 'Team list'
};

const ListTeamsPage = async () => {
	const status = await getServerAuthSession();

	if (!status) {
		redirect('/');
	}

	return (
		<div className="m-2 flex justify-center lg:flex-row">
			<div className="flex w-full max-w-3xl flex-col gap-4">
				<TeamCreateButton />
				<Suspense fallback={<Spinner />}>
					<TeamList />
				</Suspense>
			</div>
		</div>
	);
};

export default ListTeamsPage;
