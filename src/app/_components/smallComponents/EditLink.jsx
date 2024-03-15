'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

const EditLink = ({ groupName }) => {
  const { language } = useGlobalStateContext();
  const { editButtonLabels } = useStaticSettingsContext();
  const [setting, setSetting] = useState('');

  useEffect(() => {
    if (!groupName[language]) {
      setSetting(Object.values(groupName)[0].toString().split(' ').join('-'));
    } else {
      setSetting(groupName[language].toString().split(' ').join('-'));
    }
  }, [groupName, language]);

  return (
    <Link
      className='bg-red-500 hover:bg-red-700 text-white font-bold py-[0.3rem] px-4 rounded'
      href={`/dashboard/settings/${setting}?lang=${language}`}>
      {editButtonLabels[language]}
    </Link>
  );
};

export default EditLink;
