// state/context
import { getBusinessAreas } from '@/app/api-calls/businessArea';
import { getSettings } from '@/app/api-calls/setting';

// components
import SettingsPage from '@/components/ui/Settings/SettingsPage';

// types
import { SettingsArrayResponse } from '@/types/type';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { businessAreas } = await getBusinessAreas();

  const { settings: drafts } = (await getSettings({
    documentStatus: 'draft',
    isDeleted: false,
  })) as SettingsArrayResponse;

  const { settings: published } = (await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  })) as SettingsArrayResponse;

  return (
    <SettingsPage
      businessAreas={businessAreas}
      drafts={drafts}
      published={published}
    />
  );
};

export default page;
