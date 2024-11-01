'use client';
// components
import SelectInput from '@/components/reusable/Inputs/SelectInput';

// types
import { InsertSettingData } from '@/types/type';
import { Dispatch, SetStateAction } from 'react';

const types = [
  {
    _id: null,
    name: {
      en: 'simple',
      mk: 'едноставен',
      gr: 'гр',
    },
  },
  {
    _id: null,
    name: {
      en: 'translations',
      mk: 'преводи',
      gr: 'гр',
    },
  },
  {
    _id: null,
    name: {
      en: 'key/value',
      mk: 'име/вредност',
      gr: 'гр',
    },
  },
];

interface SelectInputProps {
  setInputType: Dispatch<
    SetStateAction<'simple' | 'translations' | 'key/value'>
  >;
  setInputData: Dispatch<SetStateAction<InsertSettingData>>;
}

const SelectType = ({ setInputType, setInputData }: SelectInputProps) => {
  const handleExtraction = (data: string) => {
    setInputType(data as string as 'simple' | 'translations' | 'key/value');
    setInputData('');
  };
  return (
    <div>
      <SelectInput
        data={{
          defaultLanguage: 'en',
          state: types,
          defaultValue: types[0].name.en,
          selectName: 'input-type',
          showEmptyOption: false,
          fieldSetClass: 'flex flex-col items-start bg-white px-[2px]',
        }}
        extractData={handleExtraction}
      />
    </div>
  );
};

export default SelectType;
