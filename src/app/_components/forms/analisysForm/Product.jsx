'use client';
import { memo, useCallback, useEffect, useRef } from 'react';

// state/context
import { SET_PRODUCT } from '@/app/dashboard/_state/analisys/actionTypes';
import { useAnalisysDispatchContext } from '@/app/dashboard/_state/analisys/analisysContext';

const Product = ({ product }) => {
	const dispatch = useAnalisysDispatchContext();

	const selectRef = useRef(null);

	useEffect(() => {
		if (!product)
			dispatch({ type: SET_PRODUCT, payload: selectRef.current.value });
	});

	const handleOnChange = useCallback(() => {
		dispatch({ type: SET_PRODUCT, payload: selectRef.current.value });
	}, [dispatch]);

	// console.log(state.header, 'state in Product.jsx');
	return (
		<label>
			<h3>Product</h3>
			<select
				ref={selectRef}
				onChange={handleOnChange}
				value={product}
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
				<option value='UNL-95'>UNL-95</option>
				<option value='UNL-98'>UNL-98</option>
				<option value='ULSD'>ULSD</option>
				<option value='JET-A1'>JET-A1</option>
				<option value='FUEL OIL'>FUEL OIL</option>
				<option value='H.G.O.'>H.G.O.</option>
				<option value='L.P.G.'>L.P.G.</option>
			</select>
		</label>
	);
};

export default memo(Product);
