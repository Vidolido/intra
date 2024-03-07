'use client';

import { DELETE_FROM_COLLECTION } from '@/app/dashboard/_state/settings/actionTypes';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

const Single = ({ item, index }) => {
	const { editButtonLabels, saveButtonLabels, deleteButtonLabels } =
		useStaticSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const [canEdit, setCanEdit] = useState(false);

	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');

	const handleEdit = (e) => {
		e.preventDefault();
		console.log('EDIT');
		setCanEdit(true);
	};

	const handleSave = (e) => {
		e.preventDefault();
		setCanEdit(false);
	};

	const handleDelete = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({ type: DELETE_FROM_COLLECTION, payload: index });
		},
		[dispatch, index]
	);

	return (
		<div className='flex flex-row justify-between gap-2'>
			<input
				disabled={!canEdit && 'disabled'}
				className='inline-block w-3/4 rounded px-3 py-1 hover:border-red-200 focus:outline-none border-2 border-slate-100 border-opacity-90'
				defaultValue={item}
			/>
			{!canEdit && (
				<button
					onClick={handleEdit}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>
					{editButtonLabels[lang]}
				</button>
			)}

			{canEdit && (
				<button
					onClick={handleSave}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
					{saveButtonLabels[lang]}
				</button>
			)}

			<button
				onClick={handleDelete}
				className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'>
				{deleteButtonLabels[lang]}
			</button>
		</div>
	);
};

export default Single;
