import { type PropsWithChildren, useEffect, useState } from 'react';
import { type Move } from 'pokenode-ts';

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
	const [open, setOpen] = useState(false);

	const setMove = (move: Move) => {
		setSelectedMove(move);
		onChange(move);
		setOpen(false);
	};

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!event.target) return;
			const target = event.target as HTMLElement;
			if (!target.closest('.relative')) {
				setOpen(false);
			}
		};

		document.addEventListener('click', listener);

		return () => {
			document.removeEventListener('click', listener);
		};
	});

	return (
		<div className="relative">
			<button
				onClick={() => setOpen(!open)}
				className={`flex h-10 w-full items-center justify-between rounded-lg border border-emerald-900  px-4 py-1 transition-all duration-150  ${
					selectedMove !== null
						? `bg-${selectedMove.type.name}-accent text-black hover:bg-${selectedMove.type.name}-dark hover:text-white`
						: 'bg-emerald-700 text-white hover:bg-emerald-800'
				}`}
			>
				<div className="flex w-full justify-between">
					{selectedMove !== null ? (
						<div className="flex w-full justify-between pe-2">
							{selectedMove.names.find(name => name.language.name === 'en')
								?.name ?? selectedMove.name}{' '}
							<PokemonTypeBadge cut type={selectedMove.type.name} />
						</div>
					) : (
						children
					)}
				</div>
				<div className="flex items-center justify-center">
					<i className="bi bi-chevron-down" />
				</div>
			</button>
			{open && (
				<ul className="absolute z-[1] h-80 w-64 overflow-y-auto rounded-box bg-base-100 p-2 shadow">
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
							<li key={attack.id} className="mx-2 my-1">
								<button
									className="flex h-full w-full justify-between rounded-xl p-0.5 text-emerald-900 transition-all duration-150 hover:bg-emerald-100"
									onClick={() => setMove(attack)}
								>
									{attack.names.find(name => name.language.name === 'en')
										?.name ?? attack.name}
									<PokemonTypeBadge type={attack.type.name} />
								</button>
							</li>
						))}
				</ul>
			)}
		</div>
	);
};
