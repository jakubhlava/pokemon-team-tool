import { Card } from '@/components/Card';
import { PokemonSearch } from '@/components/PokemonSearch';
import { PokemonList } from '@/components/PokemonList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create team'
};

const CreateTeamPage = () => {
	return (
		<div className="min-w-80 flex flex-col p-4 xl:flex-row xl:gap-8">
			<div className="flex flex-col gap-4 xl:basis-3/5">
				<PokemonSearch />
				<PokemonList />
			</div>
			<div className="flex flex-col gap-4 xl:basis-2/5">
				<Card>
					<h1 className="text-2xl font-semibold text-emerald-900">
						Stats analysis
					</h1>
				</Card>
				<Card>
					<p>Něco něco, nevim</p>
					<p>Tabulka, něco</p>
					<p>Dobrej tým 👍, cg</p>
				</Card>
			</div>
		</div>
	);
};

export default CreateTeamPage;
