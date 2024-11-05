// state/actions
import { getSettings } from '@/app/api-calls/setting';
import { getLaboratoryTemplates } from '@/app/api-calls/templates';

// components
import TemplatesPage from '@/components/ui/Templates/TemplatesPage';

// types
import { DynamicTemplateSettings } from '@/types/type';

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

  const { products, countries, types, laboratoryTemplates } =
    (await getSettings({
      documentStatus: 'published',
      isDeleted: false,
      settingName: ['Products', 'Countries', 'Types', 'Laboratory Templates'],
    })) as DynamicTemplateSettings;

  const schema = laboratoryTemplates?.optionsSchema
    ? laboratoryTemplates?.optionsSchema
    : { parameter: { name: { singular: {}, plural: {} } }, collections: [] };

  return (
    <TemplatesPage
      published={published}
      drafts={draftTemplates}
      data={{
        products,
        types,
        countries,
        schemaNames: schema,
      }}
    />
  );
};

export default page;
