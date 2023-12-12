import { type PropsWithChildren } from 'react';

import Navigation from '@/components/Navigation';

const AuthenticatedLayout = ({ children }: PropsWithChildren) => (
	<div className="flex flex-col gap-4">
		<Navigation />
		{children}
	</div>
);

export default AuthenticatedLayout;
