'use client';
import React, { useEffect, useState, ChangeEvent, FocusEvent } from 'react';

// state/actions
import { cn } from '@/functions/cn';

//compponents
import LanguageInputField from './LanguageInputField';
import LanguageSelector from './LanguageSelector';

// types
import {
	Language,
	LanguageInputComponent,
	LanguageInputData,
	LanguageMap,
	Metadata,
	Reset,
} from '@/types/type';

// helper
const initializeState = (
	languages: Language[],
	data: LanguageInputComponent
) => {
	return languages.reduce((acc: LanguageInputComponent, lang: Language) => {
		acc[lang.language] = data && data[lang.language] ? data[lang.language] : '';
		return acc;
	}, {});
};

interface LanguageInputProps {
	languages: Language[];
	data?: LanguageInputData | null;
	extractData?:
		| ((data: LanguageInputComponent, dataObj: Metadata) => void)
		| null;
	reset?: Reset | null;
	onChange?: (value: LanguageMap) => void;
}
const LanguageInput = ({
	languages,
	data = null,
	extractData,
	reset = null,
}: LanguageInputProps) => {
	const [state, setState] = useState(() =>
		data && data?.state ? initializeState(languages, data.state) : {}
	);
	const [selectedLanguage, setSelectedLanguage] = useState(
		data?.defaultLanguage || languages[0].language
	);

	useEffect(() => {
		const shouldReset = reset?.resetData
			? Object.values(reset.resetData).some((value) => value === true)
			: false;

		if (
			shouldReset &&
			data?.inputName &&
			reset?.components.includes(data?.inputName) &&
			data?.state
		) {
			const newState = initializeState(languages, data.state);
			setState(newState); // Reset state

			const newResetData = Object.fromEntries(
				Object.keys(reset.resetData).map((key) => [key, false])
			);

			// reset?.setReset && reset.setReset(newResetData);
		}
	}, [reset, languages, data]);

	useEffect(() => {
		if (data?.state) {
			const newState = initializeState(languages, data.state);
			if (JSON.stringify(state) !== JSON.stringify(newState)) {
				setState(newState);
			}
		}
	}, [data?.state, languages]);

	const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
		if (state) {
			extractData &&
				extractData(state, {
					id: e.target.id,
					name: e.target.name,
					type: e.target.type,
				});
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setState((prevState) => ({
			...prevState,
			[selectedLanguage]: newValue,
		}));
	};

	const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
		setSelectedLanguage(e.target.value);

	return (
		<fieldset name={data?.fieldSetName} className={cn(data?.fieldSetClass)}>
			<label className={cn(data?.labelClass)}>
				{data?.label}
				{data && data.required && <span className='text-red-500 ml-1'>*</span>}
			</label>
			<div className='flex flex-nowrap gap-1 w-full'>
				<LanguageInputField
					id={data?.id}
					value={state ? state[selectedLanguage] : ''}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					inputName={data?.inputName}
					inputClass={data?.inputClass}
					disabled={data?.disabled || false}
					required={data?.required}
				/>
				<LanguageSelector
					languages={languages}
					selectedLanguage={selectedLanguage}
					onChange={handleLanguageChange}
					disabled={data?.disabled || false}
				/>
			</div>
		</fieldset>
	);
};

export default LanguageInput;
