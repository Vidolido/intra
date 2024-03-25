'use client';
import { memo, useCallback } from 'react';

// state/context
import { SET_HEADER_DATA } from '@/app/dashboard/_state/analisys/actionTypes';
import {
	useAnalisysContext,
	useAnalisysDispatchContext,
} from '@/app/dashboard/_state/analisys/analisysContext';

export default memo(function AnalisysHeaderOptions({ option, optionSettings }) {
	const dispatch = useAnalisysDispatchContext();

	const handleBlur = useCallback(
		(e) => {
			if (!e.target.value) return;
			const payload = {
				[option]: { ...optionSettings, value: e.target.value },
			};
			dispatch({ type: SET_HEADER_DATA, payload });
		},
		[option, optionSettings, dispatch]
	);
	return (
		<label className='flex flex-row items-center justify-between w-full gap-2'>
			<span>{optionSettings.name}:</span>
			<input
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
				type={optionSettings.type}
				onBlur={handleBlur}
			/>
		</label>
	);
});
