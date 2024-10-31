'use client';
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';

// components
import NormalInput from '@/components/reusable/Inputs/NormalInput';
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import ContextButton from '@/components/reusable/ContextButton';

// types
import {
  ActionResponse,
  InsertSettingsState,
  Language,
  Metadata,
  Reset,
} from '@/types/type';

let types = (
  languages,
  value,
  onChange,
  reset
  // resetComponentData,
  // setResetComponentData
) => ({
  simple: (
    <NormalInput
      data={{
        state: value,
        name: 'simple',
        fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
        inputClass: 'h-21px',
      }}
      extractData={onChange}
      reset={reset}
    />
  ),
  translations: (
    <LanguageInput
      languages={languages}
      data={{
        defaultLanguage: languages[0].language,
        state: value,
        labelClass: 'block',
        inputName: 'translations',
      }}
      extractData={onChange}
      reset={reset}
    />
  ),
  'key/value': (
    <>
      <NormalInput
        data={{
          state: value,
          name: 'key',
          fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
          inputClass: 'h-21px',
        }}
        extractData={onChange}
        reset={reset}
      />
      <NormalInput
        data={{
          state: value,
          name: 'value',
          fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
          inputClass: 'h-21px',
        }}
        extractData={onChange}
        reset={reset}
      />
    </>
  ),
});

interface CollectionInputProps {
  languages: Language[];
  inputType: 'simple' | 'translations' | 'key/value';
  selectedCollection: string;
  state: InsertSettingsState;
  setState: Dispatch<SetStateAction<InsertSettingsState>>;
  inputData: string;
  setInputData: Dispatch<SetStateAction<null>>;
  setActionStatus: Dispatch<SetStateAction<ActionResponse>>;
  reset: Reset;
  buttonLabel: string;
}

const CollectionInput = ({
  languages,
  inputType,
  selectedCollection,
  state,
  setState,
  inputData,
  setInputData,
  setActionStatus,
  reset,
  buttonLabel,
}: CollectionInputProps) => {
  const handleAdd = () => {
    if (!inputData) {
      setActionStatus({
        error: { collectionInput: 'Add a value.' },
        success: null,
      });
    } else {
      let collections = state?.collections ? { ...state.collections } : {};
      let collectionToInsert = collections[selectedCollection]
        ? [...collections[selectedCollection]]
        : [];

      let payload = {
        id: generateID(),
        inputType,
        value: inputData,
      };
      collectionToInsert.push(payload);
      collections[selectedCollection] = collectionToInsert;

      setState((prev) => ({ ...prev, collections }));

      setActionStatus({
        error: null,
        success: {
          collectionInput: 'Successfuly added.',
        },
      });
      setInputData(null);
      reset?.setReset({
        submit: false,
        add: true,
        collections: false,
      });
    }
  };

  const handleChange = (data, dataObj: Metadata) => {
    let name = dataObj?.name;
    let value = data;
    if ('simple' === dataObj?.name && typeof data === 'string') {
      setInputData(value);
    }
    if ('translations' === dataObj?.name && typeof data === 'object') {
      setInputData(value);
    }
    if ('key/value' === inputType && typeof data === 'string') {
      setInputData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <fieldset className='flex items-start gap-2' name='collection-input'>
      {types(languages, inputData, handleChange, reset)[inputType]}
      <ContextButton label={buttonLabel} type='edit' onClick={handleAdd} />
    </fieldset>
  );
};

export default memo(CollectionInput);