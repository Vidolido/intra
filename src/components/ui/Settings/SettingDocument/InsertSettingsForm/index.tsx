'use client';
import { useEffect, useState } from 'react';
import { createCollectionsState } from '../helpers';

// state/actions
import { insertSettings } from '@/data-acceess/settings/insertSetting';
import { isObjectEmpty } from '@/functions/isObjectEmpty';

// components
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import SelectInput from '@/components/reusable/Inputs/SelectInput';
import ErrorMsg from '@/components/reusable/ErrorMsg';
import CollectionInput from './CollectionInput';
import ContextButton from '@/components/reusable/ContextButton';

// types
import {
  ActionResponse,
  Collection,
  CollectionsOutput,
  InputType,
  InsertSettingData,
  InsertSettingsState,
  Language,
  LanguageMap,
  Parameter,
  ResetComponentsData,
  Setting,
} from '@/types/type';
import SelectType from './SelectType';
import DisplayCollections from './DisplayCollections';
interface InsertSettingsFormProps {
  languages: Language[];
  setting: Setting;
}

const InsertSettingsForm = ({
  setting,
  languages,
}: InsertSettingsFormProps) => {
  let parameterName = setting.optionsSchema?.parameter;
  let collections = setting.optionsSchema?.collections.map((coll) => ({
    ...coll,
    _id: coll._id?.toString(),
  }));

  const [state, setState] = useState<InsertSettingsState>({
    parameter: {},
    collections: createCollectionsState(collections as Collection[]) || {},
  });
  const [selectedCollection, setSelectedCollection] = useState(
    (collections && collections[0]._id?.toString()) || ''
  );

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

  const [inputType, setInputType] = useState<InputType>('simple');
  const [inputData, setInputData] = useState<InsertSettingData>('');

  useEffect(() => {
    if (
      collections &&
      Object.keys(collections).length !==
        Object.keys(state.collections || {}).length
    ) {
      setState((prev) => ({
        ...prev,
        collections: createCollectionsState(collections),
      }));
    }
  }, [collections, state.collections]);

  const handleMainParam = (data: LanguageMap) => {
    setState((prev) => ({ ...prev, parameter: data }));
  };

  const handleChangeInputType = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setInputType(value as InputType);
    // setInputData(null);
  };

  const handleSelection = (data: string) => {
    setSelectedCollection(data);
  };

  const handleSubmit = async () => {
    let col: CollectionsOutput = state.collections;
    let areCollectionsEmpty = Object.values(col).every(
      (coll) => coll === undefined || (Array.isArray(coll) && coll.length === 0)
    );
    let isEmpty = isObjectEmpty(state?.parameter);

    if (isEmpty) {
      setActionStatus({
        data: null,
        success: null,
        error: true,
        message: 'Enter at least one language entry.',
        component: 'parameter',
        isLoading: false,
      });
    } else if (areCollectionsEmpty) {
      setActionStatus({
        data: null,
        success: null,
        error: true,
        message: 'Add at least one collection.',
        component: 'parameter',
        isLoading: false,
      });
    } else {
      const response = (await insertSettings(
        state,
        setting._id.toString()
      )) as ActionResponse;

      setActionStatus({ ...response });

      let collId = Object.keys(collections as Collection[])[0];
      if (response.success) {
        setInputType('simple');
        setState({
          parameter: {},
          collections:
            createCollectionsState(collections as Collection[]) || {},
        });
        setSelectedCollection(collId);
        setResetComponents({
          singular: true,
          plural: true,
          collections: true,
          collection: '',
        });
      }
    }
  };

  console.log(state, 'the state in insert');

  return (
    <form className='border border-slate-200 rounded p-1'>
      <h4>Insert Settings</h4>
      <LanguageInput
        languages={languages}
        data={{
          defaultLanguage: languages[0].language,
          state: state?.parameter,
          label: parameterName?.name?.singular?.en,
          labelClass: 'block',
          inputName: 'main-parameter',
        }}
        extractData={handleMainParam}
        // reset={{
        //   resetData: resetComponents,
        //   setReset: setResetComponents,
        //   resetType: 'submit',
        // }}
      />

      {actionStatus?.error && actionStatus.component === 'main-parameter' && (
        <ErrorMsg msg={actionStatus?.message} />
      )}

      <div className='flex gap-2'>
        <fieldset className='flex flex-col min-w-[200px]'>
          <label>Collection</label>
          <SelectInput
            data={{
              defaultLanguage: languages[0].language,
              state: collections,
              defaultValue: selectedCollection,
              fieldSetClass:
                'flex flex-col items-start bg-white px-[2px] w-full',
              selectClasses: 'w-full',
            }}
            extractData={handleSelection}
          />
        </fieldset>
        <fieldset className='flex flex-col'>
          <label>Input Type</label>
          <SelectType setInputType={setInputType} setInputData={setInputData} />
        </fieldset>
      </div>
      <CollectionInput
        languages={languages}
        inputType={inputType}
        selectedCollection={selectedCollection}
        state={state}
        setState={setState}
        actionStatus={actionStatus}
        setActionStatus={setActionStatus}
        inputData={inputData}
        setInputData={setInputData}
        reset={{
          resetData: resetComponents,
          setReset: setResetComponents,
          components: ['insert-collections'],
        }}
        buttonLabel='Add to collection'
      />

      {/* {actionStatus?.error?.collectionInput && (
        <ErrorMsg msg={actionStatus?.error?.collectionInput} />
      )} */}

      <div className='border border-slate-300 rounded p-1'>
        <h5>Items</h5>
        <DisplayCollections
          languages={languages}
          state={state}
          setState={setState}
          selectedCollection={selectedCollection}
        />
      </div>
      <ContextButton
        label='Add Setting'
        type='edit'
        classes='w-full'
        onClick={handleSubmit}
      />
    </form>
  );
};

export default InsertSettingsForm;
