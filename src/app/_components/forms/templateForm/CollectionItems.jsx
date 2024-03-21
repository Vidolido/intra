import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useTemplatesContext } from '@/app/dashboard/_state/templates/templatesContext';
import { getItemWithId } from '@/app/utls/templateFunctions';
import { useCallback, useMemo } from 'react';

export default function CollectionItems({ data }) {
	const { language } = useGlobalStateContext();
	const { templateData } = useTemplatesContext();

	const collectionItems = useMemo(
		() => getItemWithId(data, templateData),
		[data, templateData]
	);

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

			return <span key={index}>{optionValues}</span>;
		},
		[language]
	);

	console.log(data, 'the data');
	console.log(collectionItems);

	return (
		<div className='flex gap-16'>
			{data &&
				data.map((item, index) => {
					return (
						<div key={index} className='flex flex-col border'>
							<h3 className='capitalize'>{item?.groupName[language]}</h3>
							{collectionItems.length > 0 &&
								collectionItems.map((collectionItem, i) => {
									const [_, collItem] = collectionItem.find(
										(itemToFind) =>
											JSON.stringify(itemToFind[0]) ===
											JSON.stringify(item.groupName)
									);

									return checkForType(collItem, i);
								})}
						</div>
					);
				})}
		</div>
	);
}
