import { type Metadata } from 'next';
import { Suspense } from 'react';

import TeamFormModal from '@/components/TeamFormModal';
import { TeamList } from '@/components/TeamList';
import React, { StaticCard } from '@/components/StaticCard';
import {Spinner} from "@/components/spinner";

export const metadata: Metadata = {
	title: 'Team list'
};

const ListTeamsPage = () => (
	<div className="m-2 flex flex-col gap-8 lg:m-8 lg:flex-row">
		<div className="lg:basis-2/5">
			<StaticCard>
				<h1 className="text-2xl font-semibold text-emerald-900">
					Team preview
				</h1>
				Tady bude detail po rozkliknutí a tak... Asi
			</StaticCard>
		</div>
		<div className="flex flex-col gap-4 lg:basis-3/5">
			<TeamFormModal />
			<Suspense fallback={<Spinner />}>
				<TeamList />
			</Suspense>
		</div>
	</div>
);

export default ListTeamsPage;
