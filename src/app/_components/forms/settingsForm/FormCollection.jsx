import { memo } from 'react';

const FormCollection = ({ children }) => {
	return <div className='flex flex-col gap-2'>{children}</div>;
};

// export default memo(FormCollection);
export default FormCollection;
