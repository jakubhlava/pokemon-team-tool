'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LoginStatus } from './LoginStatus';

const Navigation = () => {
	const pathname = usePathname();

	return (
		<div className="flex h-16 items-center justify-between bg-white/60 p-4">
			<nav>
				<ul className="flex flex-row gap-4">
					<Link href="/" className="font-semibold text-emerald-900 lg:hidden">
						PTT
					</Link>
					<Link
						href="/"
						className="hidden text-xl font-semibold text-emerald-900 lg:block"
					>
						Pokémon Team Tool
					</Link>
					<div className="divider divider-horizontal" />
					<Link
						href="/team/list"
						className="font-semibold text-emerald-900 lg:hidden"
					>
						LIST
					</Link>
					<Link
						href="/team/list"
						className={`${
							pathname === '/team/list' ? 'btn-ghost btn-active' : ''
						} btn btn-ghost btn-sm hidden rounded-lg px-5 text-xl font-semibold text-emerald-900 lg:block`}
					>
						List
					</Link>
				</ul>
			</nav>
			<LoginStatus />
		</div>
	);
};

export default Navigation;
