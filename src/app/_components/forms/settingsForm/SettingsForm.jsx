'use client';

import { testAction } from '@/app/_actions/settingsActions';

// custom hooks
import { useSettings } from './util/useSettings';

// components
import TranslateInput from './TranslateInput';
import RadioButtnos from './RadioButtons';
import MainInput from './MainInput';
import FormCollection from './FormCollection';
import { SubmitButton } from '../submitButton/SubmitButton';

const SettingsForm = () => {
	const { collection, collectionType } = useSettings();
	// const [collectionType, setCollectionType] = useState('single');
	// const [collection, setCollection] = useState({
	// 	single: [],
	// 	translatedString: [],
	// 	limit: [],
	// });

	console.log(collection, 'the collection');

	return (
		<form
			action={testAction}
			className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
			<span>Title</span>
			<TranslateInput submitOnEnter={false} name={'title'} />

			<RadioButtnos />

			<MainInput />
			{/* 
			{collection[collectionType].length > 0 && <hr className='m-5' />} */}

			{/* {collection[collectionType].length > 0 && (
				<FormCollection
					collectionType={collectionType}
					formCollection={collection}
				/>
			)} */}
			<SubmitButton />
		</form>
	);
};

export default SettingsForm;
