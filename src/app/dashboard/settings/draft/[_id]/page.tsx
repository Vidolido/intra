// state/actions
import { getBusinessAreas } from '@/api-calls/businessArea';
import { getLanguages } from '@/api-calls/languages';
import { getSettingById } from '@/api-calls/setting';

// components
import SettingDocument from '@/components/ui/Settings/SettingDocument';

//types
interface PageProps {
	params: { [key: string]: string };
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }: PageProps) => {
	const { _id } = params;

	const { languages } = await getLanguages();
	const { businessAreas } = await getBusinessAreas();

	const { setting: draft } = await getSettingById(_id);

	return (
		<SettingDocument
			title='Draft Setting'
			languages={languages}
			businessAreas={businessAreas}
			setting={draft}
		/>
	);
};

export default page;
