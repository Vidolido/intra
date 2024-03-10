import { Suspense } from 'react';

// components
import DisplaySettings from '@/app/_components/settings/DisplaySettings';

export async function getData() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, {
		next: { tags: ['collection'], revalidate: 10 },
	});
	if (!res.ok) {
		throw new Error('Failed to fetch data: ' + res.statusText);
	}

	return await res.json();
}

// Да проверам дали кје работи без овие
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const revalidate = 0;

export default async function Settings() {
	const data = await getData();
	return (
		<div className='flex flex-row flex-wrap justify-center align-middle gap-16'>
			<Suspense fallback={<div>Loading...</div>}>
				{!data.length ? (
					<h2>There are no settings available.</h2>
				) : (
					data?.map((item) => <DisplaySettings key={item} setting={item} />)
				)}
			</Suspense>
		</div>
	);
}
