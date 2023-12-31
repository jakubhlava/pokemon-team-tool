import Image from 'next/image';

import { LoginStatusLanding } from '@/components/LoginStatusLanding';

const Home = () => (
	<div className="flex h-screen w-full flex-col items-center justify-center gap-8">
		<div className="block gap-4 rounded-xl bg-white/60 p-6 shadow-xl backdrop-blur">
			<div className="relative">
				<Image
					src="/Pokemon.svg"
					alt="Pikachu"
					width={384}
					height={384}
					className="absolute bottom-12 left-0 sm:bottom-16"
					priority
				/>
				<span className="text-2xl font-extrabold sm:text-4xl">
					Pokémon Team Tool
				</span>
			</div>
		</div>
		<div className="flex flex-col gap-4 rounded-xl bg-white/60 p-6 shadow-xl backdrop-blur">
			<span className="flex gap-4 text-lg font-semibold">
				<i className="bi bi-graph-up-arrow" /> Build your dream team and see
				your stats!
			</span>
			<span className="flex gap-4 text-lg font-semibold">
				<i className="bi bi-list-check" /> Save your teams, so you are always
				prepared for battle!
			</span>
			<span className="flex gap-4 text-lg font-semibold">
				<i className="bi bi-search" /> Discover all possiblities!
			</span>
		</div>
		<LoginStatusLanding />
	</div>
);

export default Home;
