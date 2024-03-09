'use client';
import { memo, useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// state/context
import {
	DELETE_FROM_COLLECTION,
	EDIT_COLLECTION_ITEM,
} from '@/app/dashboard/_state/settings/actionTypes';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

export default memo(function Single({ data }) {
	const { editButtonLabels, saveButtonLabels, deleteButtonLabels } =
		useStaticSettingsContext();
	const dispatch = useSettingsDispatchContext();
	const [canEdit, setCanEdit] = useState(false);

	const inputRef = useRef(null);

	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');

	const handleEdit = (e) => {
		if (!inputRef.current.value) return;

		if (!inputRef.current.value && e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		e.preventDefault();
		setCanEdit(true);
	};

	const handleSave = useCallback(
		(e) => {
			// console.log(e, 'THE E');
			if (!inputRef.current.value) return;

			if (!inputRef.current.value && e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			e.preventDefault();
			setCanEdit(false);

			dispatch({
				type: EDIT_COLLECTION_ITEM,
				payload: { id: data.id, item: inputRef.current.value },
			});
		},
		[dispatch, data.id]
	);

	const handleDelete = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({ type: DELETE_FROM_COLLECTION, payload: data.id });
		},
		[dispatch, data.id]
	);

	const handleOnChange = (e) => {
		// console.log(e);
		if (!inputRef.current.value) return;

		if (!inputRef.current.value && e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
	};

	const handleKeyDown = (e) => {
		if (!inputRef.current.value && e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
	};
	return (
		<div className='flex flex-row justify-between gap-2'>
			<input
				ref={inputRef}
				disabled={!canEdit && 'disabled'}
				className='inline-block w-3/4 rounded px-3 py-1 hover:border-red-200 focus:outline-none border-2 border-slate-100 border-opacity-90'
				defaultValue={data?.item}
				onChange={handleOnChange}
				onKeyDown={handleKeyDown}
			/>
			{!canEdit && (
				<button
					type='button'
					onClick={handleEdit}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>
					{editButtonLabels[lang]}
				</button>
			)}

			{canEdit && (
				<button
					type='button'
					onClick={handleSave}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
					{saveButtonLabels[lang]}
				</button>
			)}
			<button
				type='button'
				onClick={handleDelete}
				className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'>
				{deleteButtonLabels[lang]}
			</button>
		</div>
	);
});

// export default Single;
