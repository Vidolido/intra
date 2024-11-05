import { getLanguages } from '@/app/api-calls/languages';
import { getSettings } from '@/app/api-calls/setting';
import { getTemplateById } from '@/app/api-calls/templates';
import { mutateTemplateSettings } from '@/functions/mutateTemplateSettings';

// components
import TemplateDocument from '@/components/ui/Templates/TemplateDocument';

//types
import { DynamicTemplateSettings, Setting } from '@/types/type';
interface PageProps {
  searchParams: { [key: string]: string };
}

type Test = {
  [key: string]: Setting;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ searchParams }: PageProps) => {
  const { _id } = searchParams;
  const { languages } = await getLanguages();
  const { template } = await getTemplateById(_id);
  // const { template } = await getTemplateById(_id);

  const settings = (await getSettings({
    documentStatus: 'published',
    isDeleted: false,
    settingName: [
      'Products',
      'Grouped Parameters',
      'Types',
      'Laboratory Templates',
    ],
  })) as DynamicTemplateSettings;

  let defaultLanguage = languages[0].language;

  return (
    <TemplateDocument
      title='Edit Draft Template'
      defaultLanguage={defaultLanguage}
      settings={settings}
      template={template}
    />
  );
};

export default page;
