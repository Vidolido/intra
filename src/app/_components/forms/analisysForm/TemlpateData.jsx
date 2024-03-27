'use client';
import { useCallback } from 'react';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import {
	useAnalisysContext,
	useAnalisysDispatchContext,
} from '@/app/dashboard/_state/analisys/analisysContext';
import { SET_ANALISYS_RESULT } from '@/app/dashboard/_state/analisys/actionTypes';

export default function TemlpateData() {
	const { language } = useGlobalStateContext();
	const dispatch = useAnalisysDispatchContext();
	// const state = useAnalisysContext();
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
	// console.log(state.header);
	const handleBlur = useCallback(
		(e, row, index) => {
			if (!e.target.value) return;
			let items = row.map((rowItem) => rowItem[1]);
			// const payload = [...items, { result: e.target.value, index }];
			const payload = { index, row: [...items, { result: e.target.value }] };
			dispatch({ type: SET_ANALISYS_RESULT, payload });
		},
		[dispatch]
	);
	// console.log(templates, 'the  template is');
	return templates?.map((firstLayer) => {
		// console.log(firstLayer.templateData, 'the first layer');
		return firstLayer?.templateData.map((secondLayer, index) => {
			// console.log(secondLayer, 'the secondLayer');
			return (
				<div
					key={index}
					className='flex justify-between items-center border-2 hover:border-red-200 rounded'>
					{secondLayer.map(([groupName, item], i) => {
						// console.log(item, 'now these');
						return checkForType(item, i);
					})}
					<input
						onBlur={(e) => handleBlur(e, secondLayer, index)}
						type='text'
						className='w-1/3 border-l-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 '
					/>
				</div>
			);
		});
	});
}
