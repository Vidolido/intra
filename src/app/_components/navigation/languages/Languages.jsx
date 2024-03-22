'use client';
import { useCallback, useState } from 'react';

// state/context
import { CHANGE_LANGUAGE } from '@/app/_globalState/actionTypes';
import { useGlobalStateDispatchContext } from '@/app/_globalState/globalStateContext';

const languages = ['en', 'mk', 'gr'];

const Languages = () => {
  const dispatch = useGlobalStateDispatchContext();

  const [language, setLanguage] = useState('en');

  const handleOnLangChange = useCallback(
    (e) => {
      setLanguage(e.target.value);
      dispatch({ type: CHANGE_LANGUAGE, payload: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, language]
  );

  return (
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
  );
};

export default Languages;
