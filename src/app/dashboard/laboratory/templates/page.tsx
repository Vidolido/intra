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
  try {
    const [templatesResponse, settingsResponse] = await Promise.all([
      Promise.all([
        getLaboratoryTemplates({
          documentStatus: 'published',
          isDeleted: false,
        }),
        getLaboratoryTemplates({
          documentStatus: 'draft',
          sorted: true,
        }),
      ]),
      getSettings({
        documentStatus: 'published',
        isDeleted: false,
        settingName: ['Products', 'Countries', 'Types', 'Laboratory Templates'],
      }) as Promise<DynamicTemplateSettings>,
    ]);

    const [publishedResponse, draftsResponse] = templatesResponse;
    const { templates: published } = publishedResponse;
    const { templates: draftTemplates } = draftsResponse;

    const { products, countries, types, laboratoryTemplates } =
      settingsResponse;

    // make this error to give instructions on how to fill the apropriate setting documents,
    // so they can be used here.
    // if (!products || !countries || !types || !laboratoryTemplates) {
    //   throw new Error('Missing required settings data');
    // }

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
  } catch (error) {
    console.error('Page Error:', error);
    // might want to return an error component here
    throw error; // Let Next.js error boundary handle it
  }
};
export default page;
