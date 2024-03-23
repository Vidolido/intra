'use client';
import { useRef } from 'react';

// state/context
import {
	ADD_GROUPNAME,
	SET_LANGUAGE,
} from '@/app/dashboard/_state/settings/actionTypes';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';

// import { useSearchParams } from 'next/navigation';

const AddGroupName = () => {
	const { languages, addButtonLabels } = useStaticSettingsContext();
	// const state = useSettingsContext();
	const globalState = useGlobalStateContext();
	const dispatch = useSettingsDispatchContext();

	// const searchParams = useSearchParams();
	// const lang = searchParams.get('lang');

	const { language } = globalState;

	const inputRef = useRef(null);
	const selectRef = useRef(null);

	const handleOnLangChange = (e) => {
		dispatch({ type: SET_LANGUAGE, payload: selectRef.current.value });
		inputRef.current.value = '';
	};

	const handdleOnClick = (e) => {
		e.preventDefault();

		// Тука да вратам еррор
		if (!inputRef.current.value) return;

		dispatch({
			type: ADD_GROUPNAME,
			payload: {
				language: selectRef.current.value,
				value: inputRef.current.value.toLowerCase(),
			},
		});
	};
	// console.log(language, 'THE GLOBAL STATE');
	// console.log('AddGroupName RAN');
	return (
		<label className='flex flex-col gap-2'>
			<input
				ref={inputRef}
				type='text'
				className='capitalize border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
			/>
			<select
				ref={selectRef}
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
				onChange={handleOnLangChange}
				defaultValue={language}>
				{languages.map((lang, i) => (
					<option key={i} value={lang}>
						{lang}
					</option>
				))}
			</select>
			<button
				type='button'
				onClick={handdleOnClick}
				className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
				{addButtonLabels[language]}
			</button>
		</label>
	);
};

export default AddGroupName;
