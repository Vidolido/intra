import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { useState } from 'react';
import LanguageInput from './LanguageInput';

const FormCollection = () => {
	const { collectionType, collection } = useSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const [canEdit, setCanEdit] = useState(false);

	// console.log(collection, collectionType, 'these two');
	return (
		<div className='flex flex-col gap-2'>
			{collection[collectionType] &&
				collection[collectionType].map((item, i) => (
					<LanguageInput key={i} item={item} />
				))}
		</div>
	);
};

export default FormCollection;
