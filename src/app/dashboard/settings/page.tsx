// state/context
import { getBusinessAreas } from '@/app/api-calls/businessArea';
import { getSettings } from '@/app/api-calls/setting';

// components
import SettingsPage from '@/components/ui/Settings/SettingsPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { businessAreas } = await getBusinessAreas();
  const { settings: drafts } = await getSettings({
    isDeleted: 'false',
  });
  const { settings: published } = await getSettings({
    documentStatus: 'published',
    isDeleted: 'false',
  });

  return (
    <SettingsPage
      businessAreas={businessAreas}
      drafts={drafts}
      published={published}
    />
  );
};

export default page;
