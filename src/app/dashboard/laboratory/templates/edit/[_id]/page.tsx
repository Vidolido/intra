import { getLanguages } from '@/app/api-calls/languages';
import { getSettings } from '@/app/api-calls/setting';
import { getTemplateById } from '@/app/api-calls/templates';

// components
import TemplateDocument from '@/components/ui/Templates/TemplateDocument';

//types
import { DynamicTemplateSettings } from '@/types/type';
interface PageProps {
  params: { [key: string]: string };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }: PageProps) => {
  const { _id } = params;
  const { languages } = await getLanguages();
  const { template } = await getTemplateById(_id);

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
      title='Edit Template'
      defaultLanguage={defaultLanguage}
      settings={settings}
      template={template}
    />
  );
};

export default page;
