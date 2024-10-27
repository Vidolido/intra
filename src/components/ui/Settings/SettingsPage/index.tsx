// import PublishedSettings from './(page)/PublishedSettings';
// import DisplayDraftSettings from './(page)/DisplayDraftSettings';

// types
import { BusinessAreas, Setting } from '@/types/type';

// components
import CreateDraft from '@/components/reusable/CreateDraft';

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
				{/* <PublishedSettings sectors={sectors} published={published} /> */}
				{/* <DisplayDraftSettings drafts={drafts} /> */}
			</div>
		</div>
	);
};

export default SettingsPage;
