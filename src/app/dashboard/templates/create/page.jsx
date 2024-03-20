import { Suspense } from 'react';

// components
import TemplateForm from '@/app/_components/forms/templateForm/TemplateForm';

export async function getTemplateData() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, {
		next: { tags: ['templates'], revalidate: 10 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data: ' + res.statusText);
	}
	return await res.json();
}

// export const dynamic = 'force-dynamic';
// export const dynamicParams = true;

// Работи само со ова(приметив каснење, да видам дали ќе се случи пак), но ќе остаам да видам уште некој ден. 11.03.2024
// export const revalidate = 0;

export default async function Create() {
	const data = await getTemplateData();

	// console.log(data);

	return (
		<div className='w-10/12 px-2'>
			<h3>Create a new Template</h3>
			<Suspense fallback={<span>Loading...</span>}>
				<TemplateForm data={data} />
			</Suspense>
		</div>
	);
}

// export default Create;
