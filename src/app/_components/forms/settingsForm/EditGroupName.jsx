'use client';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

// state/constext
import { ADD_GROUPNAME } from '@/app/dashboard/_state/settings/actionTypes';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const EditGroupName = ({ groupName }) => {
	const { languages, editButtonLabels, saveButtonLabels } =
		useStaticSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const globalState = useGlobalStateContext();
	const lang = globalState.language;

	const inputRef = useRef(null);
	const selectRef = useRef(null);

	// local state
	const [canEdit, setCanEdit] = useState(false);

	useEffect(() => {
		const firstValue = Object.entries(groupName)[0];

		// console.log(firstValue, 'THE FIRST VALUE');
		if (groupName) {
			inputRef.current.value = !groupName[lang]
				? firstValue[1]
				: groupName[lang];
			selectRef.current.value = !groupName[lang] ? firstValue[0] : lang;
		}
	}, [groupName, lang]);

	const handleOnLangChange = (e) => {
		selectRef.current.value = e.target.value;

		!groupName[e.target.value]
			? (inputRef.current.value = '')
			: (inputRef.current.value = groupName[e.target.value]);
	};

	const handleEdit = () => {
		setCanEdit(true);
	};

	const handleSave = useCallback(
		(e) => {
			if (!inputRef.current.value) return;

			dispatch({
				type: ADD_GROUPNAME,
				payload: {
					language: selectRef.current.value,
					value: !inputRef.current.value ? '' : inputRef.current.value,
				},
			});
			setCanEdit(false);
		},
		[dispatch]
	);

	return (
		<label className='flex flex-col gap-2'>
			<input
				ref={inputRef}
				disabled={!canEdit && 'disabled'}
				type='text'
				className='capitalize border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						console.log(e.key);
					}
				}}
			/>

			<select
				ref={selectRef}
				disabled={!canEdit && 'disabled'}
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
				onChange={handleOnLangChange}
				defaultValue={lang}>
				{languages.map((lang, i) => (
					<option key={i} value={lang}>
						{lang}
					</option>
				))}
			</select>
			{!canEdit && (
				<button
					type='button'
					onClick={handleEdit}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{editButtonLabels[lang]}
				</button>
			)}
			{canEdit && (
				<button
					type='button'
					onClick={handleSave}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{saveButtonLabels[lang]}
				</button>
			)}
		</label>
	);
};

export default memo(EditGroupName);
