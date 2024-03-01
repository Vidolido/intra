import Single from './collections/Single';
import TranslateInput from './TranslateInput';
import Limit from './collections/Limit';
import { useState } from 'react';

const switchRender = (type, item, i) => {
  switch (type) {
    case 'single':
      return <Single key={i} type={type} item={item} />;
    case 'translatedString':
      return (
        <TranslateInput
          key={i}
          submitOnEnter={false}
          name={'translations[]'}
          item={item}
        />
      );
    case 'limit':
      return <Limit key={i} />;
    default:
      return <div>NEMA</div>; // Да направам default component
  }
};

const FormCollection = ({ collectionType, formCollection }) => {
  const [extractedData, setExtractedData] = useState();
  console.log(extractedData, 'in formCollection');
  return (
    <div className='flex flex-col gap-2 border-2 border-grey-50 border-opacity-60 bg-grey-500 rounded mb-2 p-1'>
      {formCollection[collectionType]?.map((item, i) => {
        // switchRender(collectionType, item, i)
        switch (collectionType) {
          case 'single':
            return <Single key={i} type={collectionType} item={item} />;
          case 'translatedString':
            return (
              <TranslateInput
                key={i}
                submitOnEnter={false}
                name={'translations[]'}
                item={item}
                setExtractedData={setExtractedData}
              />
            );
          case 'limit':
            return <Limit key={i} />;
          default:
            return <div>NEMA</div>; // Да направам default component
        }
      })}
    </div>
  );
};

export default FormCollection;
