'use client';

// components
import SelectInput from '@/components/reusable/Inputs/SelectInput';

// types
import { LaboratoryTemplate } from '@/types/type';
interface DocumentStatusProps {
  defaultLanguage: string;
  template: LaboratoryTemplate;
}

const status = [
  {
    _id: null,
    name: {
      en: 'draft',
      mk: 'драфт',
      gr: 'гр',
    },
  },
  {
    _id: null,
    name: {
      en: 'published',
      mk: 'објавен',
      gr: 'гр',
    },
  },
];

const DocumentStatus = ({ defaultLanguage, template }: DocumentStatusProps) => {
  return (
    <fieldset name='document-status'>
      {/* <h6>Status</h6> */}
      <div className='flex gap-2'>
        <SelectInput
          data={{
            defaultLanguage: defaultLanguage,
            state: status,
            defaultValue: template.documentStatus ?? null,
            label: 'Status',
            selectName: 'status',
            fieldSetClass: 'flex flex-col items-start bg-white px-[2px] w-full',
          }}
        />
      </div>
    </fieldset>
  );
};

export default DocumentStatus;
