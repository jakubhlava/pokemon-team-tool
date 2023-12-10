import { Suspense } from 'react';

import {
	PokemonCardContent,
	type PokemonCardProps
} from '@/components/PokemonCardContent';
import { Card } from '@/components/Card';
import { StaticCard } from '@/components/StaticCard';

export const PokemonCardWrapper = ({
	teamPokemonId,
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
			<PokemonCardContent
				teamPokemonId={teamPokemonId}
				pokemonName={pokemonName}
			/>
		</Card>
	</Suspense>
);
