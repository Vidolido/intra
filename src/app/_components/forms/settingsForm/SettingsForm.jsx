'use client';

import { useState } from 'react';

// components
import TranslateInput from '../../translateInput/TranslateInput';
import RadioButtnos from './RadioButtons';
import SingleInput from './SingleInput';
import FormCollection from './FormCollection';

// const languages = ['en', 'mk', 'gr'];

const SettingsForm = () => {
  // const [data, setData] = useState([]);
  const [collectionType, setCollectionType] = useState('single');
  const [collection, setCollection] = useState({
    single: [],
    translatedString: [],
    limit: [],
  });

  return (
    <form className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
      <span>Title</span>
      {/* <TranslateInput languages={languages} setData={setData} data={data} /> */}
      <TranslateInput submitOnEnter={false} />

      <RadioButtnos
        collectionType={collectionType}
        setCollectionType={setCollectionType}
      />

      <SingleInput
        collectionType={collectionType}
        setCollection={setCollection}
      />

      {collection[collectionType].length > 0 && <hr className='m-5' />}

      {collection[collectionType].length > 0 && (
        <FormCollection
          collectionType={collectionType}
          formCollection={collection}
        />
      )}
    </form>
  );
};

export default SettingsForm;
