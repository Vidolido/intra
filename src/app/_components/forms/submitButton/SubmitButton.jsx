'use client';
import { useFormStatus } from 'react-dom';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { memo } from 'react';

export default memo(function SubmitButton() {
  const { saveButtonLabels } = useStaticSettingsContext();

  const { language } = useGlobalStateContext();

  //   const searchParams = useSearchParams();
  //   const lang = searchParams.get('lang');

  //   console.log(language, 'VO SUBMIT BUTTON');
  const { pending } = useFormStatus();
  return (
    <button
      className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 my-2 rounded w-1/4'
      type='submit'
      aria-disabled={pending}
      disabled={pending && 'disabled'}>
      {saveButtonLabels[language]}
    </button>
  );
});
