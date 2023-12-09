import { Card } from '@/components/Card';
import TeamFormModal from "@/components/TeamFormModal";
import { Metadata } from 'next';
import {TeamList} from "@/components/TeamList";
import {Suspense} from "react";

export const metadata: Metadata = {
	title: 'Team list'
};

const ListTeamsPage = () => {
	return (
		<>
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
					<TeamFormModal />
					<Suspense fallback={<div>Loading...</div>}>
						<TeamList />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default ListTeamsPage;
