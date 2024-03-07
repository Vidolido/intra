import { memo } from 'react';

const FormCollection = memo(
	function FormCollection({ children }) {
		return <div className='flex flex-col gap-2'>{children}</div>;
	},
	(prevPorps, nextProps) => {
		console.log(prevPorps, nextProps, 'THE PROPS IN FORMCOLLECTION');
		if (prevPorps.children.length !== nextProps.children.length) return false;

		return true;
	}
);

// export default memo(FormCollection);
export default FormCollection;
