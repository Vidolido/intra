'use client';
import { useState } from 'react';
import Link from 'next/link';

// components
import OptionsSvg from '@/../public/files/options.svg';
import ContextButton from '@/components/reusable/ContextButton';

const Options = ({ _id, edit, deleteItem }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className='flex relative'>
      <OptionsSvg
        onClick={() => setShowButtons(!showButtons)}
        className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer'
      />
      {showButtons && (
        <div
          className={`w-fit flex gap-1 border ml-[1px] absolute left-[28px] px-1`}>
          {edit.show && (
            <Link href={edit.link + '/' + _id} className={edit.classes}>
              edit
            </Link>
          )}
          {deleteItem.show && (
            <ContextButton
              label='delete'
              type={deleteItem.type}
              onClick={() => deleteItem.onClick(_id)}
              classes='self-end'
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Options;
