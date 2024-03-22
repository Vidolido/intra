'use server';

import DeleteButton from './DeleteButton';
// import DisplayHeadingText from '../smallComponents/DisplayHeadingText';
import EditLink from '../smallComponents/EditLink';
import TranslatedString from '../smallComponents/TranslatedString';

export default async function DisplaySettings({ setting }) {
  // console.log(setting, 'setting in Display Settings');
  return (
    <section className='flex flex-col min-w-[300px] min-h-[400px] max-h-[700px] border-2 border-grey-50 border-opacity-60 p-2 rounded'>
      <h2 className='capitalize text-2xl font-bold'>
        {/* <DisplayHeadingText groupName={setting.groupName} /> */}
        <TranslatedString item={setting.groupName} />
      </h2>
      <ul className='px-2 py-1 mt-4 mb-5'>
        {setting?.collection.map((collectionItem) => {
          return (
            <li key={collectionItem._id}>
              {collectionItem.single && (
                <span className='block border-b-2 px-1'>
                  {collectionItem?.single}
                </span>
              )}
              {collectionItem.translatedString && (
                <span className='block border-b-2 px-1'>
                  <TranslatedString item={collectionItem.translatedString} />
                </span>
              )}

              {collectionItem.limit && (
                <span className='block border-b-2 px-1'>
                  {collectionItem?.limit?.from &&
                    `Min: ${collectionItem?.limit?.from}`}{' '}
                  {collectionItem?.limit?.to &&
                    `Max: ${collectionItem?.limit?.to}`}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div className='flex flex-col justify-end h-full'>
        <div className='flex justify-between'>
          <DeleteButton settings={setting.collection} />
          {/* href-от знае да направи проблеми, треба да проверам неколку опции
  				за да видам од кои причини се случува. */}
          <EditLink groupName={setting.groupName} />
        </div>
      </div>
    </section>
  );
}
