'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import SelectInput from './SelectInput';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

const TemplateInput = ({ groupName, collection }) => {
  const { language } = useGlobalStateContext();

  return (
    <label>
      <h3 className='capitalize'>{groupName[language]}</h3>
      <SelectInput collection={collection} />
    </label>
  );
};

export default TemplateInput;
