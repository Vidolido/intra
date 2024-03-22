'use client';
import { useCallback, useEffect, useState } from 'react';

// state/constext
import { ADD_GROUPNAME } from '@/app/dashboard/_state/settings/actionTypes';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const EditGroupName = ({ groupName }) => {
  const { languages, editButtonLabels, saveButtonLabels } =
    useStaticSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const globalState = useGlobalStateContext();
  const lang = globalState.language;

  // local state
  const [language, setLanguage] = useState(lang || null);
  const [canEdit, setCanEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!groupName) return;

    if (groupName) {
      const payload =
        groupName[language] &&
        groupName[language].toString().split(' ').join('-');
      // console.log(payload, 'the payload else');
      setInput(payload);
      setLanguage(language);
    } else {
      // console.log(groupName);
      const payload = Object.entries(groupName)[0];
      // console.log(payload, 'the payload if');
      setLanguage(payload[0]);
      setInput(payload[1]);
    }

    // if (!groupName && !groupName[language]) {
    //   const payload = Object.entries(groupName)[0];
    //   console.log(payload, 'the payload if');
    //   setLanguage(payload[0]);
    //   setInput(payload[1]);
    // } else {
    //   const payload =
    //     groupName[language] &&
    //     groupName[language].toString().split(' ').join('-');
    //   console.log(payload, 'the payload else');
    //   setInput(payload);
    //   setLanguage(language);
    // }
  }, [groupName, language]);

  //   useEffect(() => {
  //     // console.log(groupName, 'OVOA GO GLEDAM');
  //     // Тука вади грешка
  //     let localState = !groupName[lang]
  //       ? Object.entries(groupName).toString().split(' ').join('-')
  //       : Object.entries(groupName).filter((e) => e[0] === language);

  //     // console.log(Object.entries(groupName), 'Object.entries');

  //     // console.log(!localState.length, 'LOCAL STATE IN EDIT GROUP NAME');

  //     setInput(!localState.length ? '' : localState[0][1]);
  //     setLanguage(!localState.length ? lang : localState[0][0]);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [groupName]);

  const handleOnLangChange = (e) => {
    setLanguage(e.target.value);
    !groupName[e.target.value]
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

  // Оваа компонента доколку нема податок за одреден јазик, кога се прави ажурирање на името на групата, GroupName може да биде празно.
  // console.log(state, 'state in EditGroupName');
  // console.log(groupName, 'the groupname');
  // console.log(input, language, 'inputs in component');

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

export default EditGroupName;

// export default memo(EditGroupName, (prev, next) => {
// 	// console.log(prev.groupName, 'previous');
// 	console.log(Object.values(prev.groupName)[0], 'previous');
// 	// console.log(next.groupName, 'next');
// 	console.log(Object.values(next.groupName)[0], 'next');
// 	//   if (
// 	//     (!prev.groupName[lang] && next.groupName[lang]) ||
// 	//     (prev.groupName[lang] && !next.groupName[lang])
// 	//   )
// 	//     true;
// 	if (Object.values(prev.groupName)[0] !== Object.values(next.groupName)[0]) {
// 		// console.log('they are not the same');
// 		return true;
// 	}
// });
