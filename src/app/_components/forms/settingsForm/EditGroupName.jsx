'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// state/constext
import { ADD_GROUPNAME } from '@/app/dashboard/_state/settings/actionTypes';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';

const EditGroupName = ({ groupName }) => {
  const { languages, editButtonLabels, saveButtonLabels } =
    useStaticSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  // local state
  const [language, setLanguage] = useState(lang ? lang : null);
  const [canEdit, setCanEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (groupName) {
      let localState = groupName && Object.entries(groupName)[0];
      setInput(localState[1]);
      setLanguage(localState[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnLangChange = (e) => {
    setLanguage(e.target.value);

    groupName[e.target.value] === undefined
      ? setInput('')
      : setInput(groupName[e.target.value]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setCanEdit(true);
  };

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      if (!input) return;

      dispatch({
        type: ADD_GROUPNAME,
        payload: { language, value: input },
      });
      setCanEdit(false);
    },
    [input, language, dispatch]
  );

  //   console.log(groupName, 'gropName in EDIT GROUP NAME');

  return (
    <label className='flex flex-col gap-2'>
      <input
        disabled={!canEdit && 'disabled'}
        type='text'
        className='capitalize border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            console.log(e.key);
          }
        }}
      />
      <select
        disabled={!canEdit && 'disabled'}
        className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
        onChange={handleOnLangChange}
        defaultValue={language}>
        {languages.map((lang, i) => (
          <option key={i} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      {/* {!canEdit && (
				<h2 className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'>
					{groupName[language]}
				</h2>
			)} */}
      {!canEdit && (
        <button
          type='button'
          onClick={handleEdit}
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
          {editButtonLabels[lang]}
        </button>
      )}
      {canEdit && (
        <button
          type='button'
          onClick={handleSave}
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
          {saveButtonLabels[lang]}
        </button>
      )}
    </label>
  );
};

export default memo(EditGroupName);
