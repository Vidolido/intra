'use client';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const TranslatedString = ({ item }) => {
  const { language } = useGlobalStateContext();
  // console.log(language, 'IN TRANSLATED STRING');
  return item[language];
};

export default TranslatedString;
