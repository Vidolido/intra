'use client';

// import { useState } from 'react';

//custom hooks
// import { useSettings } from '../_state/useSettings';

const buttonTypes = {
  single: 'Simple Values',
  translatedString: 'Translations',
  limit: 'Limits',
};

export default function RadioButtnos({ collectionType, setCollectionType }) {
  //   const { collectionType, setCollectionType } = useSettings();
  // const [collectionType, setCollectionType] = useState('single');
  return (
    <fieldset>
      <legend>Select a type:</legend>
      <div className='flex flex-row gap-2'>
        {Object.entries(buttonTypes).map((type, i) => {
          return (
            <div key={i} className='flex gap-1'>
              <input
                type='radio'
                id={type[0]}
                name='collectionType'
                className='cursor-pointer'
                value={type[0]}
                checked={type[0] === collectionType}
                onChange={() => setCollectionType(type[0])}
              />
              <label htmlFor={type[0]} className='cursor-pointer'>
                {type[1]}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
