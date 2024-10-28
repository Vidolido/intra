'use client';
import { Dispatch, SetStateAction, useState } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';

// components
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import ContextButton from '@/components/reusable/ContextButton';

//tupes
import {
	ActionResponse,
	Collection,
	Language,
	LanguageInputComponent,
	Metadata,
	Options,
	Reset,
} from '@/types/type';
import { isObjectEmpty } from '@/functions/isObjectEmpty';

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
	const [collectionData, setCollectionData] = useState({});

	const handleAdd = () => {
		setActionStatus((prev) => ({ ...prev, isLoading: true }));
		const collections = state?.collections || [];
		let areAllFieldsEmpty = Object.values(collectionData).every(
			(value) => value === ''
		);
		if (areAllFieldsEmpty) {
			setActionStatus({
				data: null,
				success: null,
				error: true,
				message: 'Please insert text for at least one language.',
				component: 'collections',
				isLoading: false,
			});
			return;
		}
		if (!isObjectEmpty(collectionData)) {
			collections.push(collectionData as Collection);
			setState((prev) => ({ ...prev, collections }));
		}
	};
	const handleCollectionData = (data: LanguageInputComponent) => {
		// const collections = state?.collections || [];
		const collection = {
			id: generateID(),
			name: data as Record<string, string>,
		} as Collection;
		// collections.push(collection);

		setCollectionData(collection);
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

			{/* <ContextButton label='Add' type='edit' onClick={handleAdd} /> */}
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
