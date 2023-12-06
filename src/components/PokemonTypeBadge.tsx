type PokemonTypeBadgeProps = {
	type: string;
	cut?: boolean;
};

const PokemonTypeBadge = ({ type, cut }: PokemonTypeBadgeProps) => {
	return (
		<span
			className={`my-auto flex items-center justify-center rounded-full px-2 py-1 font-bold text-white bg-${type} border-${type}-dark border text-xs uppercase shadow`}
		>
			{cut ? type.substring(0, 3) : type}
		</span>
	);
};

export default PokemonTypeBadge;
