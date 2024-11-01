// components
import { Dispatch, SetStateAction, useState } from 'react';
import SimpleInput from './SimpleInput';
import TranslationsInput from './TranslationsInput';
import KeyValueInput from './KeyValueInput';

// types
import {
  ActionResponse,
  InputType,
  InsertSettingData,
  InsertSettingsState,
  Language,
  Metadata,
  Reset,
} from '@/types/type';
import ContextButton from '@/components/reusable/ContextButton';
interface CollectionInputProps {
  languages: Language[];
  inputType: InputType;
  selectedCollection: string;
  state: InsertSettingsState;
  setState: Dispatch<SetStateAction<InsertSettingsState>>;
  actionStatus: ActionResponse;
  setActionStatus: Dispatch<SetStateAction<ActionResponse>>;
  inputData: InsertSettingData;
  setInputData: Dispatch<SetStateAction<InsertSettingData>>;
  reset: Reset;
  buttonLabel: string;
}

interface KeyValueProps {
  key: string;
  value: string;
}

const INPUT_COMPONENTS = {
  simple: SimpleInput,
  translations: TranslationsInput,
  'key/value': KeyValueInput,
};

const CollectionInput = ({
  languages = [],
  inputType = 'simple',
  selectedCollection,
  state,
  setState,
  actionStatus,
  setActionStatus,
  inputData,
  setInputData,
  reset,
  buttonLabel = 'Add',
}: CollectionInputProps) => {
  //   const [inputData, setInputData] = useState<InsertSettingData| null>('');

  const collections = { ...state?.collections };
  const InputComponent = INPUT_COMPONENTS[inputType];

  const handleInputChange = (
    data: InsertSettingData,
    dataObj: Metadata | null
  ) => {
    // console.log(data, dataObj, 'OVIE');
    if (inputType === 'key/value' && dataObj) {
      setInputData((prev) => ({
        ...(prev as KeyValueProps),
        [dataObj.name]: data,
      }));
    } else {
      setInputData(data);
    }
  };

  const handleAdd = () => {
    // if (inputData === null) return;
    let payload = {
      value: inputData,
      inputType,
    };
    collections[selectedCollection].push(payload);
    setState((prev) => ({
      ...prev,
      collections,
    }));
  };

  if (!InputComponent) return null;
  return (
    <fieldset className='flex gap-1 w-full'>
      <InputComponent
        languages={languages}
        onChange={handleInputChange}
        value={inputData}
      />
      <ContextButton
        label='Add to collection'
        type='edit'
        onClick={handleAdd}
      />
    </fieldset>
  );
};

export default CollectionInput;
