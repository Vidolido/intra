'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const SelectInput = ({ collection }) => {
  const { language } = useGlobalStateContext();

  return (
    <select className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
      {collection &&
        collection.map((item) => (
          <option
            key={item._id}
            value={
              item[item.collectionType][language] || item[item.collectionType]
            }>
            {item[item.collectionType][language] || item[item.collectionType]}
          </option>
        ))}
    </select>
  );
};

export default SelectInput;
