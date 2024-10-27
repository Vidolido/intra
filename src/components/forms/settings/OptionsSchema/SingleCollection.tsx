// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInput from '@/components/reusable/LanguageInput';

const SingleCollection = ({
	_id,
	languages,
	collection,
	state,
	functions,
	reset,
}) => {
	let newCollection = { ...collection };
	const handleCollectionData = (data, dataObj) => {
		// let collection
		newCollection = data;
		let collections = [...state.collections];
		collections.find((col) => col.id === dataObj.id).name = data;
		functions.handleCollectionsUpdate(collections);

		console.log(collection, 'collection');
	};

	const handleDelete = (e) => {
		let filtered = state?.collections.filter(
			(collection) => JSON.stringify(collection) !== JSON.stringify(e)
		);
		functions.handleCollectionsUpdate(filtered);

		reset.setReset((prev) => ({
			...prev,
			[reset.resetType]: true,
		}));
	};
	return (
		<div key={_id} className='flex gap-2'>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					id: collection?._id || collection.id,
					state: collection?.name,
				}}
				extractData={handleCollectionData}
				reset={reset}
			/>
			<ContextButton
				label='Remove'
				type='edit'
				onClick={() => handleDelete(collection)}
			/>
		</div>
	);
};

export default SingleCollection;
