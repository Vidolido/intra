'use client';

import { memo } from 'react';

const FormCollection = memo(function FormCollection({ children }) {
  return <div className='flex flex-col gap-2'>{children}</div>;
});

export default FormCollection;
