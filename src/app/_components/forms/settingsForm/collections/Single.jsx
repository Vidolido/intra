'use client';

import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Single = ({ item }) => {
	const { editButtonLabels, saveButtonLabels } = useStaticSettingsContext();

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

	const handleDelete = (e) => {
		e.preventDefault();
	};

	return (
		<div className='flex flex-row justify-between'>
			<input
				disabled={!canEdit && 'disabled'}
				className='inline-block w-3/4 rounded px-3 py-1 focus:outline-none border-2 border-slate-100 border-opacity-90'
				defaultValue={item}
			/>

			{!canEdit && (
				<button
					onClick={handleEdit}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{editButtonLabels[lang]}
				</button>
			)}

			{canEdit && (
				<button
					onClick={handleSave}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{saveButtonLabels[lang]}
				</button>
			)}

			<button
				onClick={handleDelete}
				className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'>
				Delete
			</button>
		</div>
	);
};

export default Single;
