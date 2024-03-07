import { memo, useCallback, useEffect, useState } from 'react';

// state/constext
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { ADD_GROUPNAME } from '@/app/dashboard/_state/settings/actionTypes';

const EditGroupName = ({ groupName }) => {
	const { languages, editButtonLabels, saveButtonLabels } =
		useStaticSettingsContext();

	const dispatch = useSettingsDispatchContext();

	// local state
	const [language, setLanguage] = useState(null);
	const [canEdit, setCanEdit] = useState(false);
	const [input, setInput] = useState('');

	// овие параметри ќе ги зема од база
	const defaultProfileSettings = {
		language: 'en',
		value: groupName['en'],
	};

	useEffect(() => {
		let localState = Object.entries(groupName)[0];
		setInput(localState[1]);
		setLanguage(localState[0]);
	}, []);

	const handleOnLangChange = (e) => {
		setLanguage(e.target.value);

		groupName[e.target.value] === undefined
			? setInput('')
			: setInput(groupName[e.target.value]);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		setCanEdit(true);
	};

	const handleSave = useCallback(
		(e) => {
			e.preventDefault();
			if (!input) return;

			dispatch({
				type: ADD_GROUPNAME,
				payload: { language, value: input },
			});
			setCanEdit(false);
		},
		[input, language, dispatch]
	);
	return (
		<label className='flex flex-col gap-2'>
			{canEdit && (
				<>
					<input
						type='text'
						className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<select
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
						onChange={handleOnLangChange}
						defaultValue={language}>
						{languages.map((lang, i) => (
							<option key={i} value={lang}>
								{lang}
							</option>
						))}
					</select>
				</>
			)}
			{!canEdit && (
				<h2 className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'>
					{groupName[language]}
				</h2>
			)}
			{!canEdit && (
				<button
					onClick={handleEdit}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{editButtonLabels[language]}
				</button>
			)}
			{canEdit && (
				<button
					onClick={handleSave}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{saveButtonLabels[language]}
				</button>
			)}
		</label>
	);
};

export default memo(EditGroupName);
