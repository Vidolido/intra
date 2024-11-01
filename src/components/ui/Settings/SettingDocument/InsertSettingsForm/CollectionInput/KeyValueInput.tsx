'use client';

// components
import NormalInput from '@/components/reusable/Inputs/NormalInput';

// types
import { InsertSettingData, Language, Metadata } from '@/types/type';
interface KeyValueProps {
  languages: Language[] | null;
  value: InsertSettingData;
  onChange: (value: InsertSettingData, meta: Metadata) => void;
}

const KeyValueInput = ({
  languages = null,
  value,
  onChange,
}: KeyValueProps) => {
  const handleExtraction = (data: string, dataObj: Metadata) => {
    onChange(data, dataObj);
  };

  let keyString: string | undefined;
  let valueString: string | undefined;

  if (typeof value === 'object' && value !== null) {
    if ('key' in value && 'value' in value) {
      keyString = value.key;
      valueString = value.value;
    }
  }

  return (
    <div className='flex gap-1'>
      <NormalInput
        data={{
          state: keyString,
          name: 'key',
          fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
          inputClass:
            'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
          required: true,
        }}
        extractData={handleExtraction}
      />
      <NormalInput
        data={{
          state: valueString,
          name: 'value',
          fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
          inputClass:
            'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
          required: true,
        }}
        extractData={handleExtraction}
      />
    </div>
  );
};
export default KeyValueInput;
