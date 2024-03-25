'use client';
import { memo, useCallback, useEffect, useRef } from 'react';

// state/context
import { SET_ANALISYS_TYPE } from '@/app/dashboard/_state/analisys/actionTypes';
import { useAnalisysDispatchContext } from '@/app/dashboard/_state/analisys/analisysContext';

const AnalysisType = ({ analisysType }) => {
	const dispatch = useAnalisysDispatchContext();

	const selectRef = useRef(null);

	useEffect(() => {
		if (!analisysType)
			dispatch({ type: SET_ANALISYS_TYPE, payload: selectRef.current.value });
	});

	const handleOnChange = useCallback(() => {
		dispatch({ type: SET_ANALISYS_TYPE, payload: selectRef.current.value });
	}, [dispatch]);

	// console.log(state.header, 'state in AnalysisType.jsx');

	return (
		<label>
			<h3>Analysis Type</h3>
			<select
				ref={selectRef}
				value={analisysType}
				onChange={handleOnChange}
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
				<option value='Certificate'>Certificate</option>
				<option value='Quality'>Quality</option>
			</select>
		</label>
	);
};

export default memo(AnalysisType);
