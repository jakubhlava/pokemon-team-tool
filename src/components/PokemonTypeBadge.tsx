type PokemonTypeBadgeProps = {
	type: string;
};

const PokemonTypeBadge = ({ type }: PokemonTypeBadgeProps) => {
	return (
		<span
			className={`inline-block rounded-full px-2 py-1 text-xs font-bold text-white bg-${type} border-${type}-dark border uppercase shadow`}
		>
			{type}
		</span>
	);
};

export default PokemonTypeBadge;
