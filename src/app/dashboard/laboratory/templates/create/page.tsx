import { getLanguages } from '@/app/api-calls/languages';
import { getSettings } from '@/app/api-calls/setting';
import { getTemplateById } from '@/app/api-calls/templates';
import { mutateTemplateSettings } from '@/functions/mutateTemplateSettings';

// components
// import Template from '@/components/Templates/Template';

//types
import { Setting } from '@/types/type';
interface PageProps {
  searchParams: { [key: string]: string };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ searchParams }: PageProps) => {
  const { _id } = searchParams;
  const { languages } = await getLanguages();
  // const { template } = await getTemplateById(_id);

  const { settings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
    settingName: ['Products'],
  });

  // const { products, countries, types, laboratoryTemplates } =
  //   mutateTemplateSettings(settings);

  // Make Instructions if these options are not available
  // console.log(products, countries, types, laboratoryTemplates, 'OVIE SE ');
  console.log(settings, 'the settings');
  return (
    <>
      Template
      {/* <Template
      title='Edit Draft Template'
      languages={languages}
      setting={setting}
      template={template}
      groups={groups}
      templateSettings={templateSettings}
      /> */}
    </>
  );
};

export default page;
