import { LoginStatus } from '@/components/LoginStatus';
import { PropsWithChildren } from 'react';

const AuthenticatedLayout = ({ children }: PropsWithChildren) => (
	<div className="flex flex-col gap-4">
		<div className="flex h-16 items-center justify-between bg-white/60 p-4">
			<span className="text-xl font-semibold text-emerald-900">
				Pokémon Team Tool
			</span>
			<LoginStatus />
		</div>
		{children}
	</div>
);

export default AuthenticatedLayout;
