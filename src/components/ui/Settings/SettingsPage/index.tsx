// components
import CreateDraft from '@/components/reusable/CreateDraft';
import PublishedSettings from './PublishedSettings';
import DisplayDraftSettings from './DisplayDraftSettings';

// types
import { BusinessAreas, ModelType, Setting } from '@/types/type';

type SettingsPageProps = {
  businessAreas: BusinessAreas[];
  drafts: Setting[];
  published: Setting[];
};

const SettingsPage = ({
  businessAreas,
  drafts,
  published,
}: SettingsPageProps) => {
  const draftConfig = {
    model: 'Setting' as ModelType,
    redirectPath: '/dashboard/settings/create',
    buttonText: 'Add New Setting',
  };
  return (
    <div className='w-full'>
      <CreateDraft {...draftConfig} />
      <div className='flex justify-between w-full'>
        <PublishedSettings
          businessAreas={businessAreas}
          published={published}
        />
        <DisplayDraftSettings drafts={drafts} />
      </div>
    </div>
  );
};

export default SettingsPage;
