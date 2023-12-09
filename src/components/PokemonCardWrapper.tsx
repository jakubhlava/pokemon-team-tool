import { Suspense } from 'react';

import {
	PokemonCardContent,
	type PokemonCardProps
} from '@/components/PokemonCardContent';
import { Card } from '@/components/Card';

export const PokemonCardWrapper = ({
	pokemonId,
	pokemonName
}: PokemonCardProps) => (
	<Suspense
		fallback={
			<Card>
				<div className="flex items-center justify-center">
					<span className="text-xl font-bold">Loading Pokémon</span>
				</div>
			</Card>
		}
	>
		<Card hoverable>
			<PokemonCardContent pokemonId={pokemonId} pokemonName={pokemonName} />
		</Card>
	</Suspense>
);
