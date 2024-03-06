// import {
// 	useSettingsContext,
// 	useSettingsDispatch,
// } from '@/app/dashboard/_state/settings/SettingsContext';
import { EXTRACT_DATA } from '@/app/dashboard/_state/settings/actionTypes';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { useSettings } from './util/useSettings';

const languages = ['en', 'mk', 'gr'];

const initialState = {
	language: '',
	value: '',
};

const TranslateInput = ({
	submitOnEnter,
	name,
	item = null,
	//   setExtractedData,
	extractData,
}) => {
	// const state = useSettingsContext();
	// const dispatch = useSettingsDispatch();
	const [data, setData] = useState(item ? item : []);
	const [language, setLanguage] = useState('en');
	const [itemByLanguage, setItemByLanguage] = useState(initialState);

	const inputRef = useRef(null);
	const selectRef = useRef(null);

	useEffect(() => {
		let filtered = data?.find((n) => n.language === language);

		!filtered
			? setItemByLanguage({ language, value: '' })
			: setItemByLanguage(filtered);
	}, [language, data]);

	const handleOnChange = useCallback(
		(e) => {
			const langIndex = item?.findIndex((i) => i.language === language);
			// const langIndex = data?.findIndex((i) => i.language === language);
			console.log(langIndex);
			if (langIndex !== -1) {
				extractData({ language, value: e.target.value });
				setData(
					data.map((d) => {
						if (d.language === language) {
							// dispatch({
							// 	type: EXTRACT_DATA,
							// 	payload: {
							// 		dataFor: 'groupName',
							// 		data: { language, value: e.target.value },
							// 	},
							// });
							// extractData({ language, value: e.target.value });
							return { language, value: e.target.value };
						} else {
							// dispatch({
							// 	type: EXTRACT_DATA,
							// 	payload: { dataFor: 'groupName', data: d },
							// });
							// extractData(d);
							return d;
						}
					})
				);
			} else {
				extractData({ language, value: e.target.value });

				setData((prevData) => [
					...prevData,
					{ language, value: e.target.value },
				]);
			}
		},
		[data, language, item, extractData]
	);
	console.log(item);
	return (
		<label className='flex flex-row gap-2 flex-wrap'>
			<input
				type='text'
				name={name}
				ref={inputRef}
				className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
				onKeyDown={(e) =>
					e.key === 'Enter' && !submitOnEnter && e.preventDefault()
				}
				onChange={handleOnChange}
				value={!itemByLanguage ? '' : itemByLanguage.value}
			/>

			<select
				name={name + 'lang'}
				id={name + 'lang'}
				ref={selectRef}
				className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
				onChange={(e) => {
					setLanguage(e.target.value);
					inputRef.current.value = '';
				}}>
				{languages.map((lang, i) => (
					<option key={i} value={lang}>
						{lang}
					</option>
				))}
			</select>
		</label>
	);
};

export default memo(TranslateInput);
