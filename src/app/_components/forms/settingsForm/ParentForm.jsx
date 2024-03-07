'use client';

const ParentForm = ({ children }) => {
  return (
    <form className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
      {children}
    </form>
  );
};

export default ParentForm;
