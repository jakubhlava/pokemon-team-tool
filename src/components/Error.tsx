import { type PropsWithChildren } from 'react';

export const Error = ({ children }: PropsWithChildren) => (
	<p className="text-sm text-red-500 mt-1">{children}</p>
);
