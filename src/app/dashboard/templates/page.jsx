import { Suspense } from 'react';
import Loading from '../loading';

// components
import DisplayTemplates from '@/app/_components/templates/DisplayTemplates';

export async function getTemplates() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/templates`, {
		next: { tags: ['templates'], revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data: ' + res);
	}

	return await res.json();
}

// export const revalidate = 0;

export default async function Templates() {
	const data = await getTemplates();

	// console.log(data, 'template data');

	return (
		<div>
			<h3>Templates</h3>
			<Suspense fallback={<Loading />}>
				<DisplayTemplates data={data} />
			</Suspense>
		</div>
	);
}
