'use client';
import { useState } from 'react';

// state/actions
import { saveOptionSchema } from '@/data-acceess/settings/saveOptionSchema';
import { createOptionsSchemaState } from '@/components/ui/Settings/SettingDocument/helpers';

// components
import ErrorMsg from '@/components/reusable/ErrorMsg';
import MainInput from './MainInput';
import AddCollections from './AddCollections';
import ShowHideButton from '@/components/reusable/ShowHideButton';
import ContextButton from '@/components/reusable/ContextButton';
import Collections from './Collections';

// types
import {
  ActionResponse,
  Language,
  Options,
  ResetComponentsData,
  Setting,
} from '@/types/type';
import { isObjectEmpty } from '@/functions/isObjectEmpty';
type OptionsSchemaProps = {
  setting: Setting;
  languages: Language[];
};

const OptionsSchema = ({ setting, languages }: OptionsSchemaProps) => {
  let optionsSchema = setting.optionsSchema || undefined;

  const [state, setState] = useState<Options>(() =>
    createOptionsSchemaState(optionsSchema)
  );
  const [visible, setVisible] = useState(optionsSchema ? false : true);

  const [actionStatus, setActionStatus] = useState<ActionResponse>({
    data: null,
    success: null,
    error: null,
    message: null,
    component: null,
    isLoading: false,
  });

  const [resetComponents, setResetComponents] = useState<ResetComponentsData>({
    singular: false,
    plural: false,
    collections: false,
    collection: '',
  });

  const submit = async () => {
    const response = (await saveOptionSchema(
      state,
      setting._id.toString()
    )) as ActionResponse;

    setActionStatus({ ...response });

    setResetComponents({
      singular: true,
      plural: true,
      collections: true,
      collection: '',
    });
  };
  return (
    <form className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-1 rounded min-w-72 w-full mb-1'>
      <input
        type='text'
        className='hidden'
        defaultValue={setting._id.toString()}
        name='document_id'
      />
      <ShowHideButton
        heading='Options Schema'
        visible={visible}
        onClick={() => setVisible(!visible)}
      />
      {visible && (
        <>
          <MainInput
            languages={languages}
            actionStatus={actionStatus}
            state={state}
            setState={setState}
            reset={{
              resetData: resetComponents,
              setReset: setResetComponents,
              components: ['singular', 'plural'],
            }}
          />

          <AddCollections
            languages={languages}
            state={state}
            setState={setState}
            setActionStatus={setActionStatus}
            reset={{
              resetData: resetComponents,
              setReset: setResetComponents,
              components: ['add-collections'],
            }}
          />

          {actionStatus?.error &&
            actionStatus.component === 'add-collections' && (
              <ErrorMsg msg={actionStatus?.message} />
            )}

          {!!state?.collections.length && (
            <Collections
              languages={languages}
              state={state}
              setState={setState}
              setActionStatus={setActionStatus}
              reset={{
                resetData: resetComponents,
                setReset: setResetComponents,
                components: ['collections'],
              }}
            />
          )}
          <ContextButton
            label='Save Options Schema'
            type='edit'
            onClick={submit}
            classes=''
            formMethod=''
          />
        </>
      )}
    </form>
  );
};

export default OptionsSchema;
