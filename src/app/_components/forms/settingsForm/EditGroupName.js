// state/constext
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { useState } from 'react';
import { ADD_GROUPNAME } from '@/app/dashboard/_state/settings/actionTypes';

const EditGroupName = () => {
	const { languages, editButtonLabels, saveButtonLabels } =
		useStaticSettingsContext();
	const [language, setLanguage] = useState('en');
	const [canEdit, setCanEdit] = useState(false);
	const [input, setInput] = useState('');

	const state = useSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const { groupName } = state;

	const handleOnLangChange = (e) => {
		setLanguage(e.target.value);

		groupName[e.target.value] === undefined
			? setInput('')
			: setInput(groupName[e.target.value]);
	};

	const handdleEdit = (e) => {
		e.preventDefault();
		setCanEdit(true);
		setInput(groupName[language]);
		console.log(e);
		console.log(groupName[language], 'this');
	};

	const handdleSave = (e) => {
		e.preventDefault();
		if (!input) return;
		dispatch({
			type: ADD_GROUPNAME,
			payload: { language, value: input },
		});
	};
	console.log(groupName);
	console.log(input);
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
						onChange={handleOnLangChange}>
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
					onClick={handdleEdit}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{editButtonLabels[language]}
				</button>
			)}
			{canEdit && (
				<button
					onClick={handdleSave}
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
					{saveButtonLabels[language]}
				</button>
			)}
		</label>
	);
};

export default EditGroupName;
