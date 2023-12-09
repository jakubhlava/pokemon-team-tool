import { type PropsWithChildren, Suspense } from 'react';

import { StaticCard } from '@/components/StaticCard';

const TeamDetailLayout = ({ children }: PropsWithChildren) => (
	<Suspense
		fallback={
			<div className="p-4">
				<StaticCard>
					<div className="flex flex-col items-center gap-8">
						<div className="flex items-center justify-center">
							<span className="text-3xl font-bold">Loading team</span>
						</div>
						<span className="loading loading-dots loading-lg" />
					</div>
				</StaticCard>
			</div>
		}
	>
		{children}
	</Suspense>
);

export default TeamDetailLayout;
