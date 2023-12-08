'use client';

import {SessionProvider} from 'next-auth/react';
import {PropsWithChildren} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({children}: PropsWithChildren) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				{children}
			</SessionProvider>
		</QueryClientProvider>
	);
}
