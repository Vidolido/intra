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
  const { settings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
    settingName: 'Products',
  });

  // Make Instructions if these options are not available
  const { products, countries, types, laboratoryTemplates } =
    mutateTemplateSettings(settings);

  // console.log(products, countries, types, laboratoryTemplates, 'OVIE SE ');
  // console.log(products, 'products');
  // const data = {
  //   products: settings.find((setting) => setting.settingName === 'Products'),
  // };

  return (
    <>
      {/* <Templates
      published={published}
      drafts={draftTemplates}
      data={{
        products,
        types,
        countries,
        schemaNames: laboratoryTemplates?.optionsSchema,
      }}
      /> */}
    </>
  );
};

export default page;
