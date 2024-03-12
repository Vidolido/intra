'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// state/context
import {
  useGlobalStateContext,
  useGlobalStateDispatchContext,
} from '@/app/_globalState/globalStateContext';
import { CHANGE_LANGUAGE } from '@/app/_globalState/actionTypes';

const languages = ['en', 'mk', 'gr'];

const Languages = () => {
  const dispatch = useGlobalStateDispatchContext();

  const [language, setLanguage] = useState('en');

  const router = useRouter();
  const pathname = usePathname();

  // Прави проблем кога ќе се стисне истиот линк
  // да пробам да најдам друг начин за ова
  // useEffect(() => {
  // 	router.replace(`?lang=${language}`);
  // }, [router, pathname, language]);
  //   const  handleChangeLanguage = (e) => {}

  //   useEffect(
  //     () => dispatch({ type: CHANGE_LANGUAGE, payload: language }),
  //     [dispatch, language]
  //   );

  const handleOnLangChange = useCallback(
    (e) => {
      setLanguage(e.target.value);
      // router.push(`?lang=${e.target.value}`);
      dispatch({ type: CHANGE_LANGUAGE, payload: e.target.value });
    },
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
