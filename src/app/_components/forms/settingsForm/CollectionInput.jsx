'use client';

import { ADD_TO_COLLECTION } from '@/app/dashboard/_state/settings/actionTypes';
import {
  useSettingsContext,
  useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const CollectionInput = () => {
  const { addButtonLabels } = useStaticSettingsContext();
  const { collectionType } = useSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const inputRef = useRef(null);

  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  useEffect(() => {
    inputRef.current.value = '';
  });

  const randomID = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  };

  const handleOnChange = useCallback(
    (e) => {
      if (!inputRef.current.value && e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === 'Enter') {
        dispatch({
          type: ADD_TO_COLLECTION,
          payload: {
            collectionType,
            data: {
              id: randomID(1, 1000),
              item: inputRef.current.value,
            },
          },
        });
      }
    },
    [collectionType, dispatch]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputRef.current.value) return;

      dispatch({
        type: ADD_TO_COLLECTION,
        payload: {
          collectionType,
          data: {
            id: randomID(1, 1000),
            item: inputRef.current.value,
          },
        },
      });
    },
    [collectionType, dispatch]
  );

  return (
    <label className='flex flex-col gap-2'>
      <input
        ref={inputRef}
        type='text'
        className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        onChange={handleOnChange}
        onKeyDown={handleOnChange}
      />
      <button
        type='button'
        className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'
        onClick={handleClick}>
        {addButtonLabels[lang]}
      </button>
    </label>
  );
};

export default CollectionInput;
