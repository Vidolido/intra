'use client';
import { useEffect, useState } from 'react';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const HeadingText = ({ groupName }) => {
  const { language } = useGlobalStateContext();

  const [returnValue, setReturnValue] = useState(null);

  useEffect(() => {
    if (!groupName[language]) {
      const payload = Object.entries(groupName)[0];
      setReturnValue(payload[1]);
    } else {
      setReturnValue(groupName[language]);
    }
  }, [language]);

  return returnValue;
};

export default HeadingText;
