'use client';
import { Dispatch, SetStateAction } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';

// components
import SingleCollection from './SingleCollection';

// types
import { ActionResponse, Language, Options, Reset } from '@/types/type';
interface CollectionsProps {
  languages: Language[];
  state: Options;
  setState: Dispatch<SetStateAction<Options>>;
  setActionStatus: Dispatch<SetStateAction<ActionResponse>>;
  reset: Reset;
}

const Collections = ({
  languages,
  state,
  setState,
  setActionStatus,
  reset,
}: CollectionsProps) => {
  let collections = state?.collections && [...state?.collections];

  return (
    <fieldset name='option-schema-collections' className='flex flex-col gap-1'>
      <h5>Collections</h5>
      {collections &&
        collections.map((collection) => (
          <SingleCollection
            key={collection?._id?.toString() || collection.id || generateID()}
            _id={
              collection?.id ||
              (collection?._id && collection?._id.toString()) ||
              generateID()
            }
            languages={languages}
            collection={collection}
            state={state}
            setState={setState}
            setActionStatus={setActionStatus}
            reset={reset}
          />
        ))}
    </fieldset>
  );
};

export default Collections;
