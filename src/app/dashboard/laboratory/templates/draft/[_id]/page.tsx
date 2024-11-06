// state/actions
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
	try {
		const [{ languages }, { template }, settings] = await Promise.all([
			getLanguages(),
			getTemplateById(_id),
			getSettings({
				documentStatus: 'published',
				isDeleted: false,
				settingName: ['Products', 'Laboratory Templates'],
			}) as Promise<DynamicTemplateSettings>,
		]);
		let defaultLanguage = languages[0].language;

		return (
			<TemplateDocument
				title='Create Draft Template'
				defaultLanguage={defaultLanguage}
				languages={languages}
				settings={settings}
				template={template}
			/>
		);
	} catch (error) {
		console.error('Page Error:', error);
		// might want to return an error component here
		throw error; // let nextjs error boundary handle it
	}
};

export default page;
