import { Suspense } from 'react';

import {
	PokemonCardContent,
	type PokemonCardProps
} from '@/components/PokemonCardContent';
import { Card } from '@/components/Card';
import { StaticCard } from '@/components/StaticCard';

export const PokemonCardWrapper = ({
	pokemonId,
	pokemonName
}: PokemonCardProps) => (
	<Suspense
		fallback={
			<StaticCard>
				<div className="flex items-center justify-center">
					<span className="text-xl font-bold">Loading Pokémon</span>
				</div>
			</StaticCard>
		}
	>
		<Card hoverable>
			<PokemonCardContent pokemonId={pokemonId} pokemonName={pokemonName} />
		</Card>
	</Suspense>
);
