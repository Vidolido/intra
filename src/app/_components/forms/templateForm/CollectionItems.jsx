import { useTemplatesContext } from '@/app/dashboard/_state/templates/templatesContext';
import { getItemWithId } from '@/app/utls/templateFunctions';
import { useMemo } from 'react';

export default function CollectionItems({ data }) {
	const { templateData } = useTemplatesContext();
	const collectionItems = useMemo(
		() => getItemWithId(data, templateData),
		[data, templateData]
	);
	// console.log(data, 'the data in collectionItems');
	// console.log(templateData, 'the templateData in collectionItems');
	console.log(collectionItems, 'the collectionItems');
	return (
		<div>
			<h2>Te go te</h2>
			{/* {collectionItems &&
				collectionItems?.map((item) => {
					console.log(item[1]._id);
					return <span key={item[1]._id}>{item[1]._id}</span>;
				})} */}
		</div>
	);
}
