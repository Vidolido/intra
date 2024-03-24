'use client';

import { SET_ANALISYS_TYPE } from '@/app/dashboard/_state/templates/actionTypes';
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

const AnalysisType = () => {
	const { analisysType, shouldUpdate } = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();

	const selectRef = useRef(null);

	useEffect(() => {
		selectRef.current.value = analisysType;
	}, []);

	const handleOnChange = useCallback(() => {
		// console.log(e);
		dispatch({ type: SET_ANALISYS_TYPE, payload: selectRef.current.value });
	}, [dispatch]);
	return (
		<label>
			<h3>Analysis Type</h3>
			<select
				ref={selectRef}
				onChange={handleOnChange}
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
				<option value='Certificate'>Certificate</option>
				<option value='Quality'>Quality</option>
			</select>
		</label>
	);
};

export default AnalysisType;
