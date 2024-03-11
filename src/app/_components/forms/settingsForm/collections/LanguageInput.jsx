'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// state/context
import {
  DELETE_FROM_COLLECTION,
  EDIT_COLLECTION_ITEM,
} from '@/app/dashboard/_state/settings/actionTypes';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';

export default memo(function LanguageInput({ data }) {
  const { languages, editButtonLabels, saveButtonLabels, deleteButtonLabels } =
    useStaticSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  // local state
  const [language, setLanguage] = useState(lang ? lang : null);
  const [canEdit, setCanEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log(data);
    let localState = Object.entries(data.item)[0];
    setInput(localState[1]);
    setLanguage(localState[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnLangChange = (e) => {
    setLanguage(e.target.value);
    data.item[e.target.value] === undefined
      ? setInput('')
      : setInput(data.item[e.target.value]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setCanEdit(true);
  };

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      if (!input) return;
      const payload = {
        id: data.id,
        item: { ...data.item, [language]: input },
      };
      dispatch({
        type: EDIT_COLLECTION_ITEM,
        payload,
      });
      setCanEdit(false);
    },
    [input, data, language, dispatch]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: DELETE_FROM_COLLECTION, payload: data.id });
    },
    [dispatch, data.id]
  );
  return (
    <label className='flex flex-row justify-between gap-2'>
      <input
        disabled={!canEdit && 'disabled'}
        type='text'
        className='inline-block w-3/4 rounded px-3 py-1 hover:border-red-200 focus:outline-none border-2 border-slate-100 border-opacity-90'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            return;
          }
        }}
      />

      {canEdit && (
        <select
          className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
          onChange={handleOnLangChange}
          defaultValue={language}>
          {languages.map((lang, i) => (
            <option key={i} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      )}

      {!canEdit && (
        <button
          type='button'
          onClick={handleEdit}
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>
          {editButtonLabels[lang]}
        </button>
      )}

      {canEdit && (
        <button
          type='button'
          onClick={handleSave}
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          {saveButtonLabels[lang]}
        </button>
      )}
      <button
        type='button'
        onClick={handleDelete}
        className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'>
        {deleteButtonLabels[lang]}
      </button>
    </label>
  );
});
