'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const LoginStatusLanding = () => {
	const { data, status } = useSession();
	if (status === 'loading')
		return (
			<button className="btn btn-primary" disabled>
				Loading...
			</button>
		);
	if (status === 'unauthenticated') {
		return (
			<div className="flex flex-col gap-4">
				<button
					onClick={() => signIn('discord', { callbackUrl: '/team/list' })}
					className="btn btn-secondary btn-lg rounded-full shadow-lg"
				>
					Join us with <i className="bi bi-discord" />
				</button>
			</div>
		);
	}
	return (
		<div className="flex flex-col items-center gap-4">
			<Link href="/team/list" className="btn btn-info btn-lg rounded-full">
				Continue to app, {data?.user.name} <i className="bi bi-chevron-right" />
			</Link>
			<button
				className="btn btn-ghost btn-sm rounded-full"
				onClick={() => signOut()}
			>
				Not you? Sign out.
			</button>
		</div>
	);
};
