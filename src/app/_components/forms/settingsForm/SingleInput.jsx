import { useEffect, useRef } from 'react';

const SingleInput = ({ collectionType, setCollection }) => {
  const newInputRef = useRef(null);

  useEffect(() => {
    newInputRef.current.value = '';
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    // console.log(newInputRef.current.name);
    setCollection((prev) => {
      return {
        ...prev,
        [collectionType]: [...prev[collectionType], newInputRef.current.value],
      };
    });
  };
  console.log(collectionType, 'in singleInput');
  return (
    <label className='flex flex-row gap-2'>
      <input
        id='newInput'
        ref={newInputRef}
        className='inline-block w-3/4 disabled:opacity-70 border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        name={collectionType}
        type='text'
        onKeyDown={(e) =>
          e.key === 'Enter' && e.target.id === 'newInput' && e.preventDefault()
        }
      />

      <button
        id='addNewButton'
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        onClick={(e) => handleOnClick(e)}>
        Add
      </button>
    </label>
  );
};

export default SingleInput;
