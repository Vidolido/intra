'use client';
import { Dispatch, SetStateAction } from 'react';

// components
import ErrorMsg from '@/components/reusable/ErrorMsg';
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';

// types
import {
  ActionResponse,
  Language,
  LanguageInputComponent,
  LanguageMap,
  Metadata,
  Options,
  Parameter,
  Reset,
} from '@/types/type';

type MainInputProps = {
  languages: Language[];
  actionStatus: ActionResponse;
  state: Options;
  setState: Dispatch<SetStateAction<Options>>;
  reset: Reset;
};

const MainInput = ({
  languages,
  actionStatus,
  state,
  setState,
  reset,
}: MainInputProps) => {
  const handleParameter = (data: LanguageInputComponent, dataObj: Metadata) => {
    const param: Parameter = state?.parameter;
    const { name } = dataObj;
    if ((data != undefined && name === 'singular') || name === 'plural') {
      param.name[name] = data as LanguageMap;
      setState((prev) => ({
        ...prev,
        parameter: param,
      }));
    }
  };
  return (
    <fieldset
      name='option-schema-main'
      className='border border-slate-300 rounded p-1 w-full'>
      <div className='flex flex-wrap w-full gap-2'>
        <div className='flex-1 min-w-[250px] w-full'>
          <LanguageInput
            languages={languages}
            data={{
              defaultLanguage: languages[0].language,
              state: state?.parameter?.name?.singular,
              fieldSetClass: ' w-full',
              inputName: 'singular',
              label: 'Singular Name',
              labelClass: 'text-sm',
            }}
            extractData={handleParameter}
            reset={reset}
          />
          {actionStatus.error && actionStatus.component === 'singular' && (
            <ErrorMsg msg={actionStatus.message} />
          )}
        </div>
        <div className='flex-1 min-w-[250px] w-full'>
          <LanguageInput
            languages={languages}
            data={{
              defaultLanguage: languages[0].language,
              state: state?.parameter?.name?.plural,
              fieldSetClass: ' w-full',
              inputName: 'plural',
              label: 'Plural Name',
              labelClass: 'text-sm w-full',
            }}
            extractData={handleParameter}
            reset={reset}
          />
          {actionStatus.error && actionStatus.component === 'plural' && (
            <ErrorMsg msg={actionStatus.message} />
          )}
        </div>
      </div>
    </fieldset>
  );
};

export default MainInput;
