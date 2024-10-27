'use client';
import React, { useEffect, useState, ChangeEvent, FocusEvent } from 'react';
import { cn } from '@/functions/cn';

// state/actions
// import { deepEqual } from '@/utils/helpers/deepEqual';

//compponents
import LanguageInputField from './LanguageInputField';
import LanguageSelector from './LanguageSelector';
import { LanguageSchema } from '@/types/zod/languagesSchema';
import { LanguageLabels } from '@/types/typesTS';
import { HasIdAndName } from '@/functions/mutateForSelect';
import { Types } from 'mongoose';
import { Languages, Options } from '@/types/zod/settingSchema';

// types

// helper

const initializeState = (languages: LanguageSchema[], data: StateFields) => {
	return languages.reduce((acc: StateFields, lang: LanguageSchema) => {
		acc[lang.language] = data && data[lang.language] ? data[lang.language] : '';
		return acc;
	}, {});
};

interface Language {
	_id: Types.ObjectId;
	language: string;
	active?: boolean;
	locale?: string;
	isDeleted?: boolean;
}

type StateFields = {
	[key: string]: string | undefined;
};

interface LanguageInputData {
	id?: string;
	state?: StateFields;
	defaultLanguage?: string;
	label?: string;
	inputName?: string;
	inputClass?: string;
	fieldSetName?: string;
	fieldSetClass?: string;
	labelClass?: string;
	required?: boolean;
	disabled?: boolean;
	error?: boolean;
	helperText?: string;
}

interface ResetConfig {
	resetData: Record<string, boolean>;
	setReset?: (data: Record<string, boolean>) => void;
	resetType: string;
}

type Metadata = {
	id: string;
	name: string;
};

interface LanguageInputProps {
	languages: LanguageSchema[];
	data?: LanguageInputData | null;
	extractData?: ((value: StateFields, metadata: Metadata) => void) | null;
	reset?: ResetConfig | null;
	onChange?: (value: LanguageLabels) => void;
}
const LanguageInput = ({
	languages,
	data = null,
	extractData,
	reset = null,
}: LanguageInputProps) => {
	const [state, setState] = useState(() =>
		data && data?.state ? initializeState(languages, data.state) : null
	);
	const [selectedLanguage, setSelectedLanguage] = useState(
		data?.defaultLanguage || languages[0].language
	);

	useEffect(() => {
		const shouldReset = reset?.resetData
			? Object.values(reset.resetData).some((value) => value === true)
			: false;

		if (shouldReset && reset?.resetType) {
			data && data?.state && initializeState(languages, data.state);
			const newResetData = Object.fromEntries(
				Object.keys(reset.resetData).map((key) => [key, false])
			);
			reset?.setReset && reset.setReset(newResetData);
		}
	}, [reset, languages, data]);

	useEffect(() => {
		const newState =
			data && data?.state && initializeState(languages, data.state);
		if (newState && JSON.stringify(state) !== JSON.stringify(newState)) {
			setState(newState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.state]);

	const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
		state != null &&
			extractData &&
			extractData(state, { id: e?.target?.id, name: e?.target?.name });
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newState = {
			...state,
			[selectedLanguage]: e.target.value,
		};
		setState(newState);
	};

	const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
		setSelectedLanguage(e.target.value);

	return (
		<fieldset
			name={data?.fieldSetName}
			className={cn(data?.fieldSetClass, 'flex flex-col')}>
			<label className={cn(data?.labelClass)}>{data?.label}</label>
			<div className='flex flex-nowrap gap-1'>
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
