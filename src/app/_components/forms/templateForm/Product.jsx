'use client';

import { SET_PRODUCT } from '@/app/dashboard/_state/templates/actionTypes';
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';
import { useCallback, useEffect, useRef } from 'react';

const Product = () => {
	const state = useTemplatesContext();
	const { product, shouldUpdate } = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();

	const selectRef = useRef(null);
	useEffect(() => {
		selectRef.current.value = product;
	}, []);

	const handleOnChange = useCallback(() => {
		dispatch({ type: SET_PRODUCT, payload: selectRef.current.value });
	}, [dispatch]);
	console.log(state);
	return (
		<label>
			<h3>Product</h3>
			<select
				ref={selectRef}
				onChange={handleOnChange}
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

export default Product;
