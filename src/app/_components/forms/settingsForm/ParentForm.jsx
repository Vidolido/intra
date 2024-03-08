'use client';

const ParentForm = ({ children }) => {
  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <form
      onKeyDown={handleOnKeyDown}
      className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
      {children}
    </form>
  );
};

export default ParentForm;
