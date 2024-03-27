'use client';
import { memo, useCallback, useEffect, useRef } from 'react';

// state/context
import { SET_INPUT } from '@/app/dashboard/_state/templates/actionTypes';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useTemplatesDispatchContext } from '@/app/dashboard/_state/templates/templatesContext';

const SelectInput = ({ collection }) => {
	const { language } = useGlobalStateContext();
	const dispatch = useTemplatesDispatchContext();

	const groupName = collection[0].groupName;

	const selectRef = useRef(null);

	const checkForType = useCallback(
		(item) => {
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
				<option key={item._id} value={item._id}>
					{optionValues}
				</option>
			);
		},
		[language]
	);

	useEffect(() => {
		let item =
			selectRef?.current &&
			collection.find((item) => item._id === selectRef.current.value);
		dispatch({
			type: SET_INPUT,
			payload: [groupName, item],
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSelectChange = useCallback(() => {
		let item =
			selectRef?.current &&
			collection.find((item) => item._id === selectRef.current.value);
		dispatch({
			type: SET_INPUT,
			payload: [groupName, item],
		});
	}, [groupName, collection, dispatch]);

	// console.log(collection, 'THE COLLECTION');

	// Тука да додадам уште едно поле, доколку корисникот сака полето да остане празно
	return (
		<select
			ref={selectRef}
			onChange={handleSelectChange}
			className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
			{collection && collection.map(checkForType)}
			<option value='empty'> </option>
		</select>
	);
};

// export default memo(SelectInput);
export default SelectInput;
