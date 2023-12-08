import { PropsWithChildren } from 'react';

type CardProps = {
	hoverable?: boolean;
	clickable?: boolean;
	onClick?: () => void;
} & PropsWithChildren;

export const Card = ({
	children,
	hoverable,
	clickable,
	onClick
}: CardProps) => {
	return (
		<div
			className={
				'rounded-2xl bg-white/60 px-8 py-4 shadow-xl backdrop-blur' +
				(hoverable
					? 'transition-all duration-500 hover:bg-white/70 xl:py-4 2xl:px-8'
					: '') +
				(clickable ? ' cursor-pointer active:scale-95' : '')
			}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
