'use client';

import { signIn, useSession } from 'next-auth/react';
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
			<div>
				<button
					onClick={() => signIn('discord')}
					className="btn btn-secondary btn-lg rounded-full shadow-lg"
				>
					Join us with <i className="bi bi-discord" />
				</button>
			</div>
		);
	}
	return (
		<div className="flex items-center gap-3">
			<Link href="/team/list" className="btn btn-info btn-lg rounded-full">
				Continue to app, {data?.user.name} <i className="bi bi-chevron-right" />
			</Link>
		</div>
	);
};
