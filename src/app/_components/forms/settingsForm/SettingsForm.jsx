'use client';

// import { useEffect, useRef, useState } from 'react';

// import { testAction } from '@/app/_actions/settingsActions';

// custom hooks
import { useSettings } from './util/useSettings';

// components
import TranslateInput from './TranslateInput';
import RadioButtnos from './RadioButtons';
import MainInput from './MainInput';
import FormCollection from './FormCollection';
import { SubmitButton } from '../submitButton/SubmitButton';

const SettingsForm = () => {
  const { collection, collectionType } = useSettings();
  // za da proveram ushte ednash
  // console.log(extractedData, 'extractedData in SETTINGSFORM');
  // const [extractedData, setExtractedData] = useState([]);
  // const [childData, setChildData] = useState(null);

  // useEffect(() => {
  //   setExtractedData(titleRef.current?.getData());
  // });

  // const handleGetData = () => {
  //   if (titleRef.current) {
  //     setExtractedData(titleRef.current.getData());
  //   }
  // };

  // useEffect(() => {
  //   handleGetData();
  // }, []);
  // useEffect(() => {
  //   console.log();
  //   titleRef.current.getData();
  // }, [titleRef]);

  // const hanldeChange = () => {
  //   console.log(titleRef.current.getData());
  // };

  // console.log(extractedData, 'in SettingsForm');
  // console.log(groupName, 'the groupName');

  // useEffect(() => {
  //   if (extractedData) setGroupName(extractedData);
  // }, [extractedData]);
  // console.log(extractedData, 'the extraction');
  return (
    <form className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
      <span>Title</span>

      <TranslateInput
        submitOnEnter={false}
        name={'title'}
        // setExtractedData={setExtractedData}
      />

      <RadioButtnos />

      <MainInput />

      {collection[collectionType].length > 0 && <hr className='m-5' />}

      {/* {collection[collectionType].length > 0 && (
        <FormCollection
          collectionType={collectionType}
          formCollection={collection}
        />
      )} */}
      {collection[collectionType].length > 0 && <SubmitButton />}
    </form>
  );
};

export default SettingsForm;
