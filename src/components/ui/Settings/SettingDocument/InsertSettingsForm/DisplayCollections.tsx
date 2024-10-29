// 'use client';

// components
import SingleCollectionItem from './SingleCollectionItem';

const DisplayCollections = ({
  languages,
  state,
  setState,
  selectedCollection,
}) => {
  let collectionItems = state?.collections && [
    ...state?.collections[selectedCollection],
  ];
  return (
    <fieldset name='collection-items'>
      <ul className='pl-5 flex flex-col gap-1'>
        {collectionItems &&
          collectionItems.map((item) => (
            <SingleCollectionItem
              key={item?.id || item?._id}
              languages={languages}
              state={state}
              setState={setState}
              selectedCollection={selectedCollection}
              item={item}
            />
          ))}
      </ul>
    </fieldset>
  );
};

export default DisplayCollections;
