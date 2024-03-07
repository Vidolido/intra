import { ADD_TO_COLLECTION } from '@/app/dashboard/_state/settings/actionTypes';
import {
  useSettingsContext,
  useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { useCallback, useRef } from 'react';

const CollectionInput = () => {
  const state = useSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const { collectionType } = state;

  const inputRef = useRef(null);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      //   console.log(inputRef);
      if (!inputRef.current.value) return;
      dispatch({
        type: ADD_TO_COLLECTION,
        payload: { collectionType, value: inputRef.current.value },
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
      />
      <button
        className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'
        onClick={handleClick}>
        Add
      </button>
    </label>
  );
};

export default CollectionInput;
