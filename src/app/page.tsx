import { LoginStatus } from '@/components/LoginStatus';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<LoginStatus />
			<button className="btn-bug btn">BUG</button>
		</div>
	);
}
