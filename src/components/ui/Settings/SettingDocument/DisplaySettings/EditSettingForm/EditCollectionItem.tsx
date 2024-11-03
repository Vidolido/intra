import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// components
import SimpleInput from './shared/SimpleInput';
import TranslationsInput from './shared/TranslationsInput';
import KeyValueInput from './shared/KeyValueInput';

// types
import {
	InputType,
	InsertSettingData,
	KeyValueProps,
	Language,
	Metadata,
	SettingCollectionItem,
} from '@/types/type';

interface EditCollectionItemProps {
	languages: Language[];
	setEditData: Dispatch<SetStateAction<InsertSettingData | null>>;
	selectedCollection: string;
	item: SettingCollectionItem;
}

const INPUT_COMPONENTS = {
	simple: SimpleInput,
	translations: TranslationsInput,
	'key/value': KeyValueInput,
};

const EditCollectionItem = ({
	languages,
	setEditData,
	item,
}: EditCollectionItemProps) => {
	const InputComponent = INPUT_COMPONENTS[item?.inputType as InputType];

	const [localKeyValue, setLocalKeyValue] = useState<KeyValueProps>(() => {
		if (item.inputType === 'key/value' && typeof item.value === 'object') {
			return {
				key: (item.value as KeyValueProps).key || '',
				value: (item.value as KeyValueProps).value || '',
			};
		}
		return { key: '', value: '' };
	});

	useEffect(() => {
		if (item.inputType === 'key/value') {
			setEditData({
				key: localKeyValue.key,
				value: localKeyValue.value,
			});
		}
	}, [localKeyValue, item.inputType, setEditData]);

	const handleInputChange = (
		data: InsertSettingData,
		dataObj: Metadata | null
	) => {
		if (item.inputType === 'simple') {
			console.log(data, 'simple');
			setEditData(data);
		} else if (item.inputType === 'translations') {
			console.log(data, 'translations');
			setEditData(data);
		} else if (
			item.inputType === 'key/value' &&
			typeof item.value === 'object' &&
			dataObj?.name
		) {
			console.log(data, 'key/value');
			setLocalKeyValue((prev) => ({
				...prev,
				[dataObj.name]: data,
			}));
		}
	};

	if (!InputComponent) return null;

	return (
		<InputComponent
			languages={languages}
			onChange={handleInputChange}
			value={item.inputType === 'key/value' ? localKeyValue : item.value}
		/>
	);
};

export default EditCollectionItem;
