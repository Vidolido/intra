import { memo, useCallback } from 'react';

// state/context
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { SET_COLLECTION_TYPE } from '@/app/dashboard/_state/settings/actionTypes';
import { useSearchParams } from 'next/navigation';

const RadioButtons = memo(
  // function RadioButtons({ collectionType }) {
  function RadioButtons({ collectionType }) {
    const { radioButtonsTitle, radioButtonTypes } = useStaticSettingsContext();
    const dispatch = useSettingsDispatchContext();

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');

    const handleCollectionType = useCallback(
      (e) => {
        dispatch({ type: SET_COLLECTION_TYPE, payload: e.target.value });
      },
      [dispatch]
    );
    // Да ги средам HTML елементите
    return (
      <fieldset>
        <legend>{radioButtonsTitle[lang]}</legend>
        <div className='flex flex-row gap-2'>
          {Object.entries(radioButtonTypes).map((type, i) => {
            return (
              <div key={i} className='flex gap-1'>
                <input
                  type='radio'
                  id={type[0]}
                  name='collectionType'
                  className='cursor-pointer'
                  value={type[0]}
                  checked={type[0] === collectionType}
                  onChange={handleCollectionType}
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
  },
  (prevProps, nextProps) => {
    // console.log(prevProps, nextProps);
    if (prevProps.collectionType === nextProps.collectionType) {
      return true;
    }
    return false;
  }
);

export default RadioButtons;
