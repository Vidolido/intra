// components
import CreateDraft from '@/components/reusable/CreateDraft';

// types
import { LaboratoryTemplate, ModelType, Options, Setting } from '@/types/type';

interface TempaltesProps {
	published: LaboratoryTemplate[];
	drafts: LaboratoryTemplate[];
	data: {
		products: Setting;
		types: Setting;
		countries: Setting;
		schemaNames: Options;
	};
}

const Templates = ({ published, drafts, data }: TempaltesProps) => {
	const draftConfig = {
		model: 'LaboratoryTemplate' as ModelType,
		redirectPath: '/dashboard/laboratory/templates/create',
		buttonText: 'Add New Template',
		additionalData: {
			schemaNames: data.schemaNames,
		},
	};
	return (
		<div className='w-full pr-2'>
			<CreateDraft {...draftConfig} />
			<div className='flex justify-between w-full'>
				{/* <PublishedTemplates published={published} data={data} /> */}
				{/* <DisplayDraftTemplates drafts={drafts} /> */}
			</div>
		</div>
	);
};

export default Templates;
