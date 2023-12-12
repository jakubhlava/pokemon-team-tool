import { type PropsWithChildren } from 'react';

type StaticCardProps = {
	hoverable?: boolean;
	clickable?: boolean;
} & PropsWithChildren;

export const StaticCard = ({
	children,
	hoverable,
	clickable
}: StaticCardProps) => (
	<div
		className={`rounded-2xl bg-white/60 px-8 py-4 shadow-xl backdrop-blur ${
			hoverable
				? ' z-0 transition-all duration-500 focus-within:z-50 hover:bg-white/70 xl:py-4 2xl:px-8'
				: ''
		}${clickable ? ' cursor-pointer active:scale-95' : ''}`}
	>
		{children}
	</div>
);
