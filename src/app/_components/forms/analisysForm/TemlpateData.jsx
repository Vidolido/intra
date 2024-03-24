'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
// state/context
import { useAnalisysContext } from '@/app/dashboard/_state/analisys/analisysContext';
import { useCallback } from 'react';

export default function TemlpateData() {
	const { language } = useGlobalStateContext();
	const { templates } = useAnalisysContext();

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
				<p key={index} className='p-1'>
					{optionValues}
				</p>
			);
		},
		[language]
	);

	console.log(templates, 'the template data');
	return templates.map((firstLayer) => {
		return firstLayer.map((secondLayer, i) => {
			return (
				<div
					key={i}
					className='flex justify-between items-center border-2 hover:border-red-200 rounded'>
					{secondLayer.map(([groupName, item], i) => {
						// console.log(item, 'now these');
						return checkForType(item, i);
					})}
					<input
						type='text'
						className='w-1/3 border-l-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 '
					/>
				</div>
			);
		});
	});
}
