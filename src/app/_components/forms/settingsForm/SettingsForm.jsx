'use client';
import { useCallback, useState } from 'react';

import {
  addGroupName,
  initialState,
} from '@/app/dashboard/_state/settings/initState';
import GroupName from './GroupName';
import { produce } from 'immer';

const SettingsForm = () => {
  const [state, setState] = useState(initialState);
  const { groupName, collectionType, collection } = state;

  const handleAddGroupName = useCallback(
    (input, language) => {
      // console.log(item.target);
      console.log(input.current.value, language.current.value);
      setState((state) =>
        produce(state, (draft) => {
          draft.groupName = {
            ...draft.groupName,
            [language.current.value]: input.current.value,
          };
        })
      );
      //   setState((state) =>
      //     addGroupName(state, {
      //       language: language.current.value,
      //       value: input.current.value,
      //     })
      //   );
      //   setState((state) => ({
      //     ...state,
      //     groupName: addGroupName(state, {
      //       language: language.current.value,
      //       value: input.current.value,
      //     }),
      //   }));
      //   setState((state) => {
      //   addGroupName(state, {
      //     language: language.current.value,
      //     value: input.current.value,
      //   });
      //   });
    },
    [state.groupName]
  );
  console.log(state);
  return (
    <form className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
      <GroupName
        groupName={groupName}
        handleAddGroupName={handleAddGroupName}
      />
    </form>
  );
};

export default SettingsForm;
