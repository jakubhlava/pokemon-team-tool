'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export const LoginStatus = () => {
	const { data, status } = useSession();
	if (status === 'loading') return <div>loading...</div>;
	if (status === 'unauthenticated') {
		return (
			<div>
				<button
					onClick={() => signIn('discord')}
					className="border-white rounded border p-3"
				>
					Sign in with Discord
				</button>
			</div>
		);
	}
	return (
		<div className="flex items-center gap-3">
			Hi, {data?.user.name}
			<button
				onClick={() => signOut()}
				className="border-white rounded border p-3"
			>
				Sign out
			</button>
		</div>
	);
};
