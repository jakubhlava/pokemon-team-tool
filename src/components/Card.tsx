import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
	return (
		<div className="rounded-2xl bg-gradient-to-r from-sky-200/30 to-teal-300/30 px-8 py-4 shadow-xl backdrop-blur">
			{children}
		</div>
	);
};
