'use client';
import { useCallback, useState } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';
import { deepEqual } from '@/utils/helpers/deepEqual';
import SingleCollection from './SingleCollection';

const Collections = ({
	languages,
	state,
	setState,
	// collections,
	functions,
	reset,
	resetLanguage,
	setResetLanguage,
	resetType,
}) => {
	let collections = state?.collections && [...state?.collections];
	// let collections = [...state.collections];
	// const [collectionData, setCollectionData] = useState(
	// 	[...state.collections] || []
	// );
	// const handleCollectionData = useCallback(
	// 	(data, dataObj) => {
	// 		console.log(data, dataObj);
	// 		const updatedCollections = collectionData.map((item) => {
	// 			if (item.id === dataObj.id) {
	// 				// Create a new object for the modified item
	// 				return { ...item, name: data };
	// 			}
	// 			return item; // Return unchanged items
	// 		});
	// 		// console.log(updatedCollections, 'updated');
	// 		functions.handleCollectionsUpdate(updatedCollections);
	// 		// setCollectionData(updatedCollections);
	// 		// reset.setReset((prev) => ({
	// 		// 	...prev,
	// 		// 	[resetType]: false,
	// 		// }));
	// 	},
	// 	[collectionData, functions]
	// );

	// const handleDelete = (e) => {
	// 	let filtered = state?.collections.filter(
	// 		(collection) => JSON.stringify(collection) !== JSON.stringify(e)
	// 	);
	// 	setState((prev) => ({
	// 		...prev,
	// 		collections: filtered,
	// 	}));
	// 	reset.setReset((prev) => ({
	// 		...prev,
	// 		[resetType]: true,
	// 	}));
	// };
	console.log(state, 'STEJTO');
	return (
		<fieldset name='option-schema-collections' className='flex flex-col gap-1'>
			<h5>Collections</h5>
			{/* {collectionData &&
				collectionData.map((collection) => (
					<div key={collection?._id || generateUUID()} className='flex gap-2'>
						<LanguageInput
							languages={languages}
							data={{
								defaultLanguage: languages[0].language,
								id: collection?._id || collection.id,
								state: collection?.name,
							}}
							extractData={handleCollectionData}
							//   extractData={null}
							resetLanguage={resetLanguage}
							setResetLanguage={setResetLanguage}
							resetType={resetType}
						/>
						<ContextButton
							label='Remove'
							type='edit'
							onClick={() => handleDelete(collection)}
						/>
					</div>
				))} */}
			{collections &&
				collections.map((collection) => (
					<SingleCollection
						key={collection?.id || collection?._id || generateUUID()}
						_id={collection?.id || collection?._id.toString() || null}
						languages={languages}
						collection={collection}
						state={state}
						functions={functions}
						reset={reset}
					/>
				))}
		</fieldset>
	);
};

export default Collections;
