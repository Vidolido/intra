'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { ADD_TO_COLLECTION } from '@/app/dashboard/_state/settings/actionTypes';
import {
  useSettingsContext,
  useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const initialState = {
  first: '',
  second: '',
};

const CollectionInput = () => {
  const { language } = useGlobalStateContext();
  const { addButtonLabels } = useStaticSettingsContext();
  const { collectionType } = useSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const [inputs, setInputs] = useState(initialState);

  // const inputRef = useRef(null);
  // const toRef = useRef(null);

  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  // useEffect(() => {
  // 	// inputRef.current.value = '';
  // 	// inputRef.current.value = '';
  // 	// toRef.current.value = '';
  // 	setInputs(initialState);
  // });

  // Привремена функција
  const randomID = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const handleOnChange = useCallback(
    (e) => {
      // console.log(e.target.name);
      setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
      if (!inputs.first) return;
      if (collectionType === 'limit' && !inputs.second) return;
      // Тука да исхендлам некој еррор
      const item = {
        single: inputs.first,
        translatedString: { [language]: inputs.first },
        limit: {
          from: inputs.first,
          to: inputs.second,
        },
      };

      const payload = {
        data: {
          id: randomID(1, 1000),
          item: item[collectionType],
        },
      };

      if (e.key === 'Enter' || e.type === 'click') {
        dispatch({
          type: ADD_TO_COLLECTION,
          payload,
        });
        setInputs(initialState);
      }
    },
    [inputs, lang, dispatch, collectionType]
  );

  return (
    <label className='flex flex-row w-full gap-2'>
      <input
        name='first'
        type='text'
        className='w-1/2 border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        value={inputs.first}
        onChange={handleOnChange}
        onKeyDown={handleOnChange}
      />
      {collectionType === 'limit' && (
        <input
          name='second'
          type='text'
          className='w-1/2 border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
          value={inputs.second}
          onChange={handleOnChange}
          onKeyDown={handleOnChange}
        />
      )}
      <button
        type='button'
        className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'
        onClick={handleOnChange}>
        {addButtonLabels[language]}
      </button>
    </label>
  );
};

export default CollectionInput;
