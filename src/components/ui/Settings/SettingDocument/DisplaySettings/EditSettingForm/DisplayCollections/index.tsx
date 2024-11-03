// 'use client';
import { Dispatch, SetStateAction } from 'react';

// components
import SingleCollectionItem from './SingleCollectionItem';

// types
import { InsertSettingsState, Language } from '@/types/type';
import { generateID } from '@/functions/generateID';
interface DisplayCollectionsProps {
	languages: Language[];
	state: InsertSettingsState;
	setState: Dispatch<SetStateAction<InsertSettingsState>>;
	selectedCollection: string;
}

const DisplayCollections = ({
	languages,
	state,
	setState,
	selectedCollection,
}: DisplayCollectionsProps) => {
	let collectionItems = state?.collections?.[selectedCollection] ?? [];
	// console.log(state, 'the state');
	return (
		<fieldset name='collection-items'>
			<ul className='pl-5 flex flex-col gap-1'>
				{collectionItems &&
					collectionItems.map((item) => (
						<SingleCollectionItem
							key={item?._id?.toString() || generateID()}
							languages={languages}
							state={state}
							setState={setState}
							selectedCollection={selectedCollection}
							item={item}
						/>
					))}
			</ul>
		</fieldset>
	);
};

export default DisplayCollections;
