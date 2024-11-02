import { Dispatch, SetStateAction, useState } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';

// components
import SimpleInput from '../shared/SimpleInput';
import TranslationsInput from '../shared/TranslationsInput';
import KeyValueInput from '../shared/KeyValueInput';
import ContextButton from '@/components/reusable/ContextButton';

// types
import {
	ActionResponse,
	CollectionsOutput,
	InputType,
	InsertSettingData,
	InsertSettingsState,
	KeyValueProps,
	Language,
	Metadata,
	Reset,
} from '@/types/type';
interface CollectionInputProps {
	languages: Language[];
	inputType: InputType;
	selectedCollection: string;
	state: InsertSettingsState;
	setState: Dispatch<SetStateAction<InsertSettingsState>>;
	actionStatus: ActionResponse;
	setActionStatus: Dispatch<SetStateAction<ActionResponse>>;
	inputData: InsertSettingData;
	setInputData: Dispatch<SetStateAction<InsertSettingData>>;
	reset: Reset;
	buttonLabel: string;
}

const INPUT_COMPONENTS = {
	simple: SimpleInput,
	translations: TranslationsInput,
	'key/value': KeyValueInput,
};

const CollectionInput = ({
	languages = [],
	inputType = 'simple',
	selectedCollection,
	state,
	setState,
	actionStatus,
	setActionStatus,
	inputData,
	setInputData,
	reset,
}: CollectionInputProps) => {
	const collections: CollectionsOutput = { ...state?.collections };
	const InputComponent = INPUT_COMPONENTS[inputType];

	const handleInputChange = (
		data: InsertSettingData,
		dataObj: Metadata | null
	) => {
		if (inputType === 'key/value' && dataObj) {
			setInputData((prev) => ({
				...(prev as KeyValueProps),
				[dataObj.name]: data,
			}));
		} else {
			setInputData(data);
		}
	};

	const handleAdd = () => {
		let payload = {
			id: generateID(),
			value: inputData,
			inputType,
		};
		collections[selectedCollection].push(payload);
		setState((prev) => ({
			...prev,
			collections,
		}));
		setInputData('');
	};

	if (!InputComponent) return null;
	return (
		<fieldset className='flex gap-1 w-full mb-1'>
			<InputComponent
				languages={languages}
				onChange={handleInputChange}
				value={inputData}
			/>
			<ContextButton
				label='Add to collection'
				type='edit'
				onClick={handleAdd}
			/>
		</fieldset>
	);
};

export default CollectionInput;
