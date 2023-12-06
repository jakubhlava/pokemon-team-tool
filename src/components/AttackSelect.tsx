import { PropsWithChildren, useState } from 'react';
import { Move } from 'pokenode-ts';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';

type AttackSelectProps = {
	attacks: Move[];
	onChange: (move: Move) => void;
} & PropsWithChildren;

export const AttackSelect = ({
	children,
	attacks,
	onChange
}: AttackSelectProps) => {
	const [selectedMove, setSelectedMove] = useState<Move | null>(null);

	const setMove = (move: Move) => {
		setSelectedMove(move);
		onChange(move);
	};

	return (
		<div className="dropdown cursor-pointer select-none ">
			<div
				tabIndex={0}
				role="button"
				className="flex h-10 w-full items-center justify-between rounded-lg border border-emerald-900 bg-emerald-700 px-4 py-1 text-white transition-all duration-150 hover:bg-emerald-800 "
			>
				<div className="flex w-full justify-between">
					{selectedMove !== null ? (
						<div className="flex w-full justify-between pe-2">
							{selectedMove.names.find(name => name.language.name === 'en')
								?.name ?? selectedMove.name}{' '}
							<PokemonTypeBadge
								cut
								type={selectedMove.type.name}
							></PokemonTypeBadge>
						</div>
					) : (
						children
					)}
				</div>
				<div className="flex items-center justify-center">
					<i className="bi bi-chevron-down"></i>
				</div>
			</div>
			<ul className="dropdown-content z-[1] h-80 w-64 overflow-y-auto rounded-box bg-base-100 p-2 shadow">
				{attacks
					.toSorted((a, b) => {
						const nameA = a.name.toUpperCase(); // ignore upper and lowercase
						const nameB = b.name.toUpperCase(); // ignore upper and lowercase
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					})
					.map(attack => (
						<li
							key={attack.id}
							onClick={() => setMove(attack)}
							className="mx-2 my-1 flex cursor-pointer justify-between rounded-xl p-0.5 text-emerald-900 transition-all duration-150 hover:bg-emerald-100"
						>
							{attack.names.find(name => name.language.name === 'en')?.name ??
								attack.name}
							<PokemonTypeBadge type={attack.type.name}></PokemonTypeBadge>
						</li>
					))}
			</ul>
		</div>
		// <details className="relative cursor-pointer rounded-lg border border-emerald-900 bg-emerald-700 px-4 py-1 text-white transition-all duration-150 hover:bg-emerald-800">
		// 	<summary className="flex w-full justify-between">
		// 		<div className="flex w-full justify-between">
		// 			{selectedMove !== null ? (
		// 				<div className="flex w-full justify-between pe-2">
		// 					{selectedMove.names.find(name => name.language.name === 'en')
		// 						?.name ?? selectedMove.name}{' '}
		// 					<PokemonTypeBadge
		// 						cut
		// 						type={selectedMove.type.name}
		// 					></PokemonTypeBadge>
		// 				</div>
		// 			) : (
		// 				children
		// 			)}
		// 		</div>
		// 		<div className="flex items-center justify-center">
		// 			<i className="bi bi-chevron-down"></i>
		// 		</div>
		// 	</summary>
		// 	<div className="absolute top-10 h-72 w-72 overflow-y-auto rounded-lg bg-white p-2 text-emerald-900 shadow-lg transition-all duration-300">
		// 		<ul>
		// 			{attacks
		// 				.toSorted((a, b) => {
		// 					const nameA = a.name.toUpperCase(); // ignore upper and lowercase
		// 					const nameB = b.name.toUpperCase(); // ignore upper and lowercase
		// 					if (nameA < nameB) {
		// 						return -1;
		// 					}
		// 					if (nameA > nameB) {
		// 						return 1;
		// 					}
		//
		// 					// names must be equal
		// 					return 0;
		// 				})
		// 				.map(attack => (
		// 					<li
		// 						key={attack.id}
		// 						onClick={() => setMove(attack)}
		// 						className="flex cursor-pointer justify-between px-2 py-1 transition-all duration-150 hover:bg-emerald-100"
		// 					>
		// 						{attack.names.find(name => name.language.name === 'en')?.name ??
		// 							attack.name}
		// 						<PokemonTypeBadge type={attack.type.name}></PokemonTypeBadge>
		// 					</li>
		// 				))}
		// 		</ul>
		// 	</div>
		// </details>
	);
};
