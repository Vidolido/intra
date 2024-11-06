'use client';

import { ContextButtonProps } from '@/types/type';

type Types = {
  [key: string]: string;
};

const ContextButton = ({
  label = 'Click',
  onClick,
  type,
  classes = '',
  formMethod = 'post',
  disabled = false,
}: ContextButtonProps) => {
  const types: Types = {
    default: `hover:underline text-black ${classes}`,
    edit: `bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold px-5 rounded h-[25px] ${classes}`,
    delete: `bg-slate-400 hover:bg-slate-500 rounded py-[2.5px] px-4 `,
  };
  return (
    <button
      type='button'
      formMethod={formMethod}
      className={types[type]}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
};

export default ContextButton;
