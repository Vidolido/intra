'use client';
import { useState } from 'react';

// components
import ShowHideButton from '@/components/reusable/ShowHideButton';
import SingleSetting from './SingleSetting';
import { BusinessAreaGroup, Setting } from '@/types/type';

type OrderedProps = {
  groupedSetting: BusinessAreaGroup;
};

const Ordered = ({ groupedSetting }: OrderedProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className='border relative min-w-72'>
      <ShowHideButton
        heading={groupedSetting?.name}
        visible={visible}
        onClick={() => setVisible(!visible)}
      />

      {!visible && (
        <ul className='p-2'>
          {groupedSetting?.documents?.map((doc) => {
            return (
              <li
                key={doc?._id.toString()}
                className='flex justify-between gap-2 w-full mb-1'>
                <SingleSetting setting={doc} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Ordered;
