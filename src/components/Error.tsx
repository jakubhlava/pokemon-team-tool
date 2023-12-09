import { type PropsWithChildren } from 'react';

export const Error = ({ children }: PropsWithChildren) => (
	<p className="mt-1 text-sm text-red-500">{children}</p>
);
