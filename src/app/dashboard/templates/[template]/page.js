import { Suspense } from 'react';

// components
import TemplateForm from '@/app/_components/forms/templateForm/TemplateForm';
import { getTemplateData } from '../create/page';
import { getTemplate } from '@/app/_actions/temlatesActions';

export async function generateStaticParams() {
	const templates = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/templates`
	).then((res) => res.json());

	return templates.map((template) => ({
		template: template._id,
	}));
}

// export async function getTemplate(template) {
// 	const res = await fetch(
// 		`${process.env.NEXT_PUBLIC_BASE_URL}/api/templates/${template}`,
// 		{
// 			next: { tags: ['template'], revalidate: 3600, cache: 'no-store' },
// 		}
// 	);

// 	if (!res.ok) {
// 		throw new Error('Failed to fetch data: ' + res);
// 	}

// 	return await res.json();
// }
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const revalidate = 0;
export default async function EditTemplate({ params }) {
	const { template } = params;
	// console.log(params, 'the params');
	const templateData = JSON.parse(await getTemplate(template));
	const getTemplateSettings = await getTemplateData(template);

	return (
		<div className='w-10/12 px-2'>
			<h3>Edit Template</h3>
			<Suspense fallback={<span>Loading...</span>}>
				<TemplateForm
					data={getTemplateSettings}
					template={templateData}
					shouldUpdate={true}
				/>
			</Suspense>
		</div>
	);
}
