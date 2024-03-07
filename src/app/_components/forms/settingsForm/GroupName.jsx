import { memo, useRef } from 'react';

const GroupName = memo(({ groupName, handleAddGroupName }) => {
  const languages = ['en', 'mk', 'gr'];
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  return (
    <div>
      <label htmlFor='groupName' className='flex flex-row gap-2 flex-wrap'>
        <input
          ref={inputRef}
          id='groupName'
          type='text'
          onChange={() => handleAddGroupName(inputRef, selectRef)}
          className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        />
        <select
          className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
          ref={selectRef}>
          {languages.map((lang, i) => (
            <option key={i} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
});

export default GroupName;
