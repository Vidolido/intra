import { Dispatch, SetStateAction, useState } from 'react';

// state/actions
import { typeOfValue } from '../../../helpers';

// components
import ContextButton from '@/components/reusable/ContextButton';
import EditCollectionItem from '../EditCollectionItem';
// import EditCollectionItem from './EditCollectionItem';
// import { formatKeyValue } from '@/utils/settings/formatKeyValue';
import {
	InputType,
	InsertSettingData,
	InsertSettingsState,
	ItemValue,
	Language,
	LanguageMap,
	SettingCollectionItem,
	Value,
} from '@/types/type';

interface SingleCollectionItemProps {
	languages: Language[];
	state: InsertSettingsState;
	setState: Dispatch<SetStateAction<InsertSettingsState>>;
	selectedCollection: string;
	item: SettingCollectionItem;
}

const SingleCollectionItem = ({
	languages,
	state,
	setState,
	selectedCollection,
	item,
}: SingleCollectionItemProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<InsertSettingData | null>(null);

	const handleSave = () => {
		const updatedCollection = state.collections[selectedCollection].map(
			(collectionItem) => {
				if (collectionItem.id === item.id && collectionItem._id === item._id) {
					return {
						...collectionItem,
						value: editData ? (editData as Value) : item.value,
					};
				}
				return collectionItem;
			}
		);

		setState(
			(prev: InsertSettingsState): InsertSettingsState => ({
				...prev,
				collections: {
					...prev.collections,
					[selectedCollection]: updatedCollection,
				},
			})
		);
		setIsEditing(false);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleDelete = (itemId: string) => {
		setState((prev) => ({
			...prev,
			collections: {
				...prev.collections,
				[selectedCollection]: prev.collections[selectedCollection].filter(
					({ id, _id }) => id !== itemId && _id !== itemId
				),
			},
		}));
	};

	return (
		<li className='list-disc border border-slate-50 hover:border-red-200 focus:outline-none'>
			<div className='flex justify-between gap-2'>
				{!isEditing ? (
					<span className='block border-l border-slate-300 px-2'>
						{typeOfValue(item, languages[0].language)}
					</span>
				) : (
					<EditCollectionItem
						languages={languages}
						// state={state}
						// setState={setState}
						setEditData={setEditData}
						selectedCollection={selectedCollection}
						item={item}
					/>
				)}
				<div>
					{!isEditing ? (
						<ContextButton
							label='edit'
							type='default'
							onClick={() => handleEdit()}
							classes='border-l border-slate-300 px-2'
						/>
					) : (
						<ContextButton
							label='save'
							type='default'
							classes='border-l border-slate-300 px-2'
							onClick={() => handleSave()}
						/>
					)}
					<ContextButton
						label='delete'
						type='default'
						onClick={() =>
							handleDelete((item?.id as string) || (item?._id as string))
						}
						classes='border-l border-slate-300 px-2'
					/>
				</div>
			</div>
		</li>
	);
};

export default SingleCollectionItem;
