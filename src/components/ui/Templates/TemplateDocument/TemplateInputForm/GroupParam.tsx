'use client';
import { useState } from 'react';

// state/actions
// import { mutateForSelect } from '@/utils/helpers/mutateForSelect';
import { mutateForSelect } from '@/functions/mutateForSelect';

// components
import CloseSvg from '@/../public/files/close.svg';
import ContextButton from '@/components/reusable/ContextButton';
import SelectGroup from './SelectGroup';

const GroupParam = ({ defaultLanguage, setGroup, groups }) => {
  console.log(groups, 'the groups');
  let mutGroups = mutateForSelect(groups.settings, 'parameter');
  const [showOptions, setShowOptions] = useState(false);

  const handleGroup = () => {
    setShowOptions(!showOptions);
    setGroup(mutGroups[0]);
  };

  const handleClose = (e: React.MouseEvent<SVGSVGElement>) => {
    setShowOptions(false);
    setGroup({});
  };

  return (
    <fieldset
      name='group-parameter'
      className='flex gap-2 w-full relative border border-slate-300 rounded p-1'>
      {!showOptions && (
        <ContextButton
          label='Group items'
          type='edit'
          onClick={handleGroup}
          classes='w-full'
        />
      )}
      {showOptions && (
        <SelectGroup
          defaultLanguage={defaultLanguage}
          setShowOptions={setShowOptions}
          groups={mutGroups}
          setGroup={setGroup}
        />
      )}
      {showOptions && (
        <CloseSvg
          onClick={handleClose}
          className={`w-[22px] h-[22px] absolute right-[2px] top-1 text-red-500 hover:text-red-300 cursor-pointer`}
        />
      )}
    </fieldset>
  );
};

export default GroupParam;
