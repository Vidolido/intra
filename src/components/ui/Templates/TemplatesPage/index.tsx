// components
import CreateDraft from '@/components/reusable/CreateDraft';
import PublishedTemplates from './PublishedTemplates';

// types
import { LaboratoryTemplate, ModelType, Options, Setting } from '@/types/type';
import DraftTemplates from './DraftTemplates';

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
        <PublishedTemplates published={published} data={data} />
        <DraftTemplates drafts={drafts} />
      </div>
    </div>
  );
};

export default Templates;
