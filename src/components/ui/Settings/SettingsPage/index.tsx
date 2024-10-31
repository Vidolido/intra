// components
import CreateDraft from '@/components/reusable/CreateDraft';
import DisplayDraftSettings from './DisplayDraftSettings';

// types
import { BusinessAreas, Setting } from '@/types/type';
import PublishedSettings from './PublishedSettings';

interface SettingsPageProps {
	businessAreas: BusinessAreas[];
	drafts: Setting[];
	published: Setting[];
}

const SettingsPage = ({
	businessAreas,
	drafts,
	published,
}: SettingsPageProps) => {
	return (
		<div className='w-full'>
			<CreateDraft />
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
