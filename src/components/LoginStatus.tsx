'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import {Spinner} from "@/components/spinner";
import React from "react";

export const LoginStatus = () => {
	const { data, status } = useSession();
	if (status === 'loading') return <Spinner />;
	if (status === 'unauthenticated') {
		return (
			<div>
				<button
					onClick={() => signIn('discord')}
					className="btn btn-ghost btn-sm"
				>
					Sign in with <i className="bi bi-discord text-[#7289da]" />
				</button>
			</div>
		);
	}
	return (
		<div className="flex items-center gap-3">
			<span className="text-sm font-semibold">
				Logged in as {data?.user.name}
			</span>
			<button onClick={() => signOut()} className="btn btn-ghost btn-sm">
				Sign out
			</button>
		</div>
	);
};
