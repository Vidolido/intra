// import { BusinessAreaDocument, BusinessAreaModel } from '@/types/types';
// import CreateDraftButton from './(page)/CreateDraftButton';
// import PublishedSettings from './(page)/PublishedSettings';
// types
import { BusinessModel, SettingsDocument } from '@/types/types';

// components
import CreateDraft from '@/components/reusable/createDraft';

// import DisplayDraftSettings from './(page)/DisplayDraftSettings';
interface SettingsPageProps {
	businessAreas: BusinessModel[];
	drafts: SettingsDocument[];
	published: SettingsDocument[];
}

// const SettingsPage = ({
// 	businessAreas,
// 	drafts,
// 	published,
// }: SettingsPageProps) => {
const SettingsPage = () => {
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
