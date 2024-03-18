'use client';

import { memo } from 'react';

const FormCollection = ({ children }) => {
	return <fieldset className='flex flex-col gap-2'>{children}</fieldset>;
};

export default memo(FormCollection);
