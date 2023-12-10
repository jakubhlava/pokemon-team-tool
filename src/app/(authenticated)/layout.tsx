import { type PropsWithChildren } from 'react';

import { LoginStatus } from '@/components/LoginStatus';

const AuthenticatedLayout = ({ children }: PropsWithChildren) => (
	<div className="flex flex-col gap-4">
		<div className="flex h-16 items-center justify-between bg-white/60 p-4">
			<span className="font-semibold text-emerald-900 lg:hidden">PTT</span>
			<span className="hidden text-xl font-semibold text-emerald-900 lg:block">
				Pokémon Team Tool
			</span>
			<LoginStatus />
		</div>
		{children}
	</div>
);

export default AuthenticatedLayout;
