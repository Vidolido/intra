import {
  useSettingsContext,
  useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';

const FormCollection = () => {
  const state = useSettingsContext();
  const dispatch = useSettingsDispatchContext();

  const { collectionType, collection } = state;

  console.log(collection, collectionType, 'these two');
  return (
    <div className='flex flex-col gap-2'>
      {collection[collectionType] &&
        collection[collectionType].map((item, i) => (
          <h3
            className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
            key={i}>
            {item}
          </h3>
        ))}
    </div>
  );
};

export default FormCollection;
