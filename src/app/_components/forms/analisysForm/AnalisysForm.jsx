'use client';

import AnalisysHeader from './AnalisysHeader';
import ParentForm from './ParentForm';
import TemlpateData from './TemlpateData';

export default function AnalisysForm() {
  return (
    <ParentForm>
      <div className='flex gap-2'>
        <div className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
          <AnalisysHeader />
        </div>
        <div className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
          <TemlpateData />
        </div>
      </div>
    </ParentForm>
  );
}
