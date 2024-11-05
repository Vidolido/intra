'use client';
import NormalInput from '@/components/reusable/Inputs/NormalInput';

interface TemplateNameProps {
  state: string | undefined;
}

const TemplateName = ({ state }: TemplateNameProps) => {
  return (
    <NormalInput
      data={{
        state: state ?? '',
        name: 'template-name',
        label: 'Template name',
        fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
        inputClass:
          'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
        required: true,
      }}
    />
  );
};

export default TemplateName;
