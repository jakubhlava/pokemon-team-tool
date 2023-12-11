import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: { template: '%s | Pokémon Team Tool', default: 'Pokémon Team Tool' },
	description: 'Tool for creating and managing Pokémon teams',
	metadataBase: new URL(process.env.DEPLOY_URL ?? 'http://localhost:3000/')
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html
		lang="en"
		data-theme="emerald"
		className="min-w-screen m-0 min-h-screen bg-gradient-to-b from-emerald-600 to-green-300"
	>
		<body className={inter.className}>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
