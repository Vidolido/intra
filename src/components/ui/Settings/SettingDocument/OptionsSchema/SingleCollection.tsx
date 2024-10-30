// state/actions
import { generateID } from '@/functions/generateID';

// components
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import ContextButton from '@/components/reusable/ContextButton';

// types
import { Dispatch, SetStateAction } from 'react';
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
interface SingleCollectionProps {
	languages: Language[];
	// _id: string;
	collection: Collection;
	state: Options;
	setState: Dispatch<SetStateAction<Options>>;
	setActionStatus: Dispatch<SetStateAction<ActionResponse>>;
	// handleCollectionUpdate: (collections: Collection[]) => void;
	reset: Reset;
}

const SingleCollection = ({
	languages,
	// _id,
	collection,
	state,
	setState,
	setActionStatus,
	// handleCollectionUpdate,
	reset,
}: SingleCollectionProps) => {
	// console.log(_id);
	const handleCollectionData = (
		data: LanguageInputComponent,
		dataObj: Metadata
	) => {
		const { id } = dataObj;
		// const collections: Collection[] = [...state.collections];

		const newCollections: Collection[] = state.collections.map((col) => {
			if (col?.id === id || (col?._id && col?._id.toString() === id)) {
				return {
					...col,
					name: data as LanguageMap,
				};
			}
			return col;
		});

		setState((prev) => ({ ...prev, collections: [...newCollections] }));
	};

	const handleDelete = (collectionToDelete: Collection) => {
		let filtered = state?.collections.filter(
			(collection) =>
				JSON.stringify(collection) !== JSON.stringify(collectionToDelete)
		);
		setState((prev) => ({ ...prev, collections: filtered }));
		// handleCollectionUpdate(filtered);
	};
	return (
		<div className='flex gap-2'>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					id: collection?._id?.toString() || collection.id,
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
