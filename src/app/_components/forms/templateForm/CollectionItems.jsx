import { useCallback, useEffect, useMemo, useState } from 'react';

// state/constext
import { DELETE_TEMPLATE_ITEM } from '@/app/dashboard/_state/templates/actionTypes';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';

// <<helper functions
import { getItemWithId } from '@/app/utls/templateFunctions';
// helper functions>>

export default function CollectionItems({ data }) {
	const { language } = useGlobalStateContext();
	const { deleteButtonLabels } = useStaticSettingsContext();
	const { templateData } = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();

	//local state
	const [collectionItems, setCollectionItems] = useState([]);

	// const collectionItems = useMemo(
	// 	() => getItemWithId(data, templateData),
	// 	[data, templateData]
	// );

	useEffect(() => {
		let items = getItemWithId(data, templateData);
		setCollectionItems(items);
	}, [data, templateData]);

	const checkForType = useCallback(
		(item, index) => {
			let optionValues = '';
			if (typeof item[item.collectionType] !== 'object')
				optionValues = item[item.collectionType];

			if (
				typeof item[item.collectionType] === 'object' &&
				item[item.collectionType][language]
			)
				optionValues = item[item.collectionType][language];

			if (
				typeof item[item.collectionType] === 'object' &&
				!item[item.collectionType][language]
			)
				optionValues = `${item[item.collectionType].from} - ${
					item[item.collectionType].to
				}`;

			return (
				<p key={index} className='w-full'>
					{optionValues}
				</p>
			);
		},
		[language]
	);
	const handleOnClick = (index, row) => {
		let filtered = collectionItems.filter((item, i) => i !== index);
		setCollectionItems(filtered);
		dispatch({ type: DELETE_TEMPLATE_ITEM, payload: { index, row } });
	};
	return (
		<div className='flex flex-col gap-2 w-10/12'>
			<div className='flex flex-row border w-10/12'>
				{data &&
					data.map((item, index) => {
						return (
							<h3 key={index} className='capitalize w-full'>
								{item?.groupName[language]}
							</h3>
						);
					})}
			</div>
			{collectionItems.map((row, rowIndex) => {
				return (
					<div key={rowIndex} className='flex justify-between'>
						<div className='flex flex-row justify-around w-10/12'>
							{row.map(([_, item], index) => {
								return checkForType(item, index);
							})}
						</div>
						<button
							type='button'
							className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'
							onClick={() => handleOnClick(rowIndex, row)}>
							{deleteButtonLabels[language]}
						</button>
					</div>
				);
			})}
		</div>
	);
}
