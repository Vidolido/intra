// state/actions
import { getBusinessAreas } from '@/app/api-calls/businessArea';
import { getLanguages } from '@/app/api-calls/languages';
import { getSettingById } from '@/app/api-calls/setting';

// components
import SettingDocument from '@/components/ui/Settings/SettingDocument';

//types
interface PageProps {
  searchParams: { [key: string]: string };
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ searchParams }: PageProps) => {
  const { _id } = searchParams;

  const { languages } = await getLanguages();
  const { businessAreas } = await getBusinessAreas();

  const { setting: draft } = await getSettingById(_id);
  console.log(businessAreas, 'BA');

  return (
    <SettingDocument
      title='Add New Setting'
      languages={languages}
      businessAreas={businessAreas}
      setting={draft}
    />
  );
};

export default page;
