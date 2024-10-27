'use client';
import { useState } from 'react';

// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';
import { generateUUID } from '@/utils/generateUUID';

const AddCollections = ({ languages, setState, setActionStatus, reset }) => {
	const [collectionData, setCollectionData] = useState({});

	const handleAdd = () => {
		let areAllFieldsEmpty = Object.values(collectionData).every(
			(value) => value === ''
		);
		if (areAllFieldsEmpty) {
			setActionStatus({
				success: null,
				error: {
					collections: 'Please insert text for at least one language.',
				},
			});
		} else {
			setState((prev) => ({
				...prev,
				collections: [
					...prev?.collections,
					{ id: generateUUID(), name: collectionData },
				],
			}));
			setActionStatus({
				success: 'Added collection.',
				error: null,
			});
			setCollectionData({});
			reset.setReset((prev) => ({ ...prev, [reset.resetType]: true }));
		}
	};
	const handleCollectionData = (data) => {
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
				}}
				extractData={handleCollectionData}
				reset={reset}
			/>

			<ContextButton label='Add' type='edit' onClick={handleAdd} />
		</fieldset>
	);
};

export default AddCollections;
