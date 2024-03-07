import { ADD_TO_COLLECTION } from '@/app/dashboard/_state/settings/actionTypes';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { memo, useCallback, useEffect, useRef } from 'react';

const CollectionInput = () => {
	const { collectionType } = useSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.value = '';
	});

	const handleOnChange = useCallback(
		(e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				dispatch({
					type: ADD_TO_COLLECTION,
					payload: { collectionType, value: inputRef.current.value },
				});
			}
		},
		[collectionType, dispatch]
	);

	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			if (!inputRef.current.value) return;

			dispatch({
				type: ADD_TO_COLLECTION,
				payload: { collectionType, value: inputRef.current.value },
			});
		},
		[collectionType, dispatch]
	);

	return (
		<label className='flex flex-col gap-2'>
			<input
				ref={inputRef}
				type='text'
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
				onChange={handleOnChange}
				onKeyDown={handleOnChange}
			/>
			<button
				className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'
				onClick={handleClick}>
				Add
			</button>
		</label>
	);
};

export default CollectionInput;
