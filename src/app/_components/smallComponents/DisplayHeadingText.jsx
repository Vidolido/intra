'use client';
// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const HeadingText = ({ groupName }) => {
  const globalState = useGlobalStateContext();
  const { language } = globalState;
  // console.log(groupName, 'in heading text smaallComp');

  return groupName[language];
};

export default HeadingText;
