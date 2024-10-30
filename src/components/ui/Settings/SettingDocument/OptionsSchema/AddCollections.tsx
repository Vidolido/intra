'use client';
import { Dispatch, SetStateAction, useState } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';
import { isObjectEmpty } from '@/functions/isObjectEmpty';

// components
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import ContextButton from '@/components/reusable/ContextButton';

//tupes
import {
	ActionResponse,
	Collection,
	Language,
	LanguageInputComponent,
	LanguageMap,
	Metadata,
	Options,
	Reset,
} from '@/types/type';

interface AddCollectionsProps {
	languages: Language[];
	state: Options;
	setState: Dispatch<SetStateAction<Options>>;
	setActionStatus: Dispatch<SetStateAction<ActionResponse>>;
	reset: Reset;
}

const AddCollections = ({
	languages,
	state,
	setState,
	setActionStatus,
	reset,
}: AddCollectionsProps) => {
	const [collectionData, setCollectionData] = useState({} as LanguageMap);

	const handleAdd = () => {
		setActionStatus((prev) => ({ ...prev, isLoading: true }));

		const hasValues = Object.values(collectionData).some(
			(value) => value && value.trim() !== ''
		);

		if (!hasValues) {
			setActionStatus({
				data: null,
				success: null,
				error: true,
				message: 'Please insert text for at least one language.',
				component: 'add-collections',
				isLoading: false,
			});
			return;
		}

		setState((prev) => ({
			...prev,
			collections: [
				...prev.collections,
				{ id: generateID(), name: collectionData },
			],
		}));

		setCollectionData({});

		setActionStatus((prev) => ({
			...prev,
			success: true,
			error: false,
			message: 'Collection added successfully',
			isLoading: false,
		}));

		// reset.setReset({
		//   singular: false,
		//   plural: false,
		//   collections: true,
		//   collection: '',
		// });
	};
	const handleCollectionData = (data: LanguageInputComponent) => {
		setCollectionData(data);
	};
	return (
		<fieldset
			name='options-schema-add'
			className='flex items-end gap-2 ml-1 mb-1'>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					state: collectionData,
					inputName: 'add-collections',
				}}
				extractData={handleCollectionData}
				reset={reset}
			/>

			<ContextButton
				label='Add'
				type='edit'
				onClick={handleAdd}
				classes='mt-[2px]'
			/>
		</fieldset>
	);
};

export default AddCollections;
