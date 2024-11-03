// state/actions
import { getSettings } from '@/app/api-calls/setting';
import { getLaboratoryTemplates } from '@/app/api-calls/templates';
import { mutateTemplateSettings } from '@/functions/mutateTemplateSettings';

// components
import Templates from '@/components/ui/Templates/TemplatesPage';

export const metadata = {
	title: 'Templates',
	description: 'Laboratory templates page',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
		isDeleted: false,
	});
	const { templates: draftTemplates } = await getLaboratoryTemplates({
		documentStatus: 'draft',
		sorted: true,
	});
	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	const { products, countries, types, laboratoryTemplates } =
		await mutateTemplateSettings(templateSettings);

	console.log(products, countries, types, laboratoryTemplates, 'OVIE SE ');

	return (
		<Templates
			published={published}
			drafts={draftTemplates}
			data={{
				products,
				types,
				countries,
				schemaNames: laboratoryTemplates?.optionsSchema,
			}}
		/>
	);
};

export default page;
