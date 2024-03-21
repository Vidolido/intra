'use client';

// state/context
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useCallback, useEffect, useState } from 'react';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import {
  DELETE_FROM_COLLECTION,
  EDIT_COLLECTION_ITEM,
} from '@/app/dashboard/_state/settings/actionTypes';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const initialState = {
  from: '',
  to: '',
};

export default function Limit({ data }) {
  const { language } = useGlobalStateContext();
  const { editButtonLabels, saveButtonLabels, deleteButtonLabels } =
    useStaticSettingsContext();

  const dispatch = useSettingsDispatchContext();

  const [canEdit, setCanEdit] = useState(false);
  const [inputs, setInputs] = useState(initialState);

  useEffect(() => {
    console.log(data);
    setInputs(data.item);
  }, [data]);

  const handleEdit = (e) => {
    if (!inputs.from && !inputs.to) return;

    if (!inputs.from && !inputs.to && e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setCanEdit(true);
  };

  const handleSave = useCallback(
    (e) => {
      if (!inputs.from && !inputs.to) return;

      if (!inputs.from && !inputs.to && e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      setCanEdit(false);

      dispatch({
        type: EDIT_COLLECTION_ITEM,
        payload: {
          id: data.id,
          item: { from: inputs.from, to: inputs.to },
        },
      });
    },
    [data.id, inputs, dispatch]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: DELETE_FROM_COLLECTION, payload: data.id });
    },
    [dispatch, data.id]
  );

  const handleOnChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleKeyDown = (e) => {
    if (!inputs.from && !inputs.to && e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <div className='flex flex-row justify-between gap-2'>
      <input
        name='from'
        disabled={!canEdit && 'disabled'}
        className='inline-block w-3/4 rounded px-3 py-1 hover:border-red-200 focus:outline-none border-2 border-slate-100 border-opacity-90'
        value={inputs.from}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <input
        name='to'
        disabled={!canEdit && 'disabled'}
        className='inline-block w-3/4 rounded px-3 py-1 hover:border-red-200 focus:outline-none border-2 border-slate-100 border-opacity-90'
        value={inputs.to}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      {!canEdit && (
        <button
          type='button'
          onClick={handleEdit}
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>
          {editButtonLabels[language]}
        </button>
      )}

      {canEdit && (
        <button
          type='button'
          onClick={handleSave}
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          {saveButtonLabels[language]}
        </button>
      )}
      <button
        type='button'
        onClick={handleDelete}
        className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'>
        {deleteButtonLabels[language]}
      </button>
    </div>
  );
}
