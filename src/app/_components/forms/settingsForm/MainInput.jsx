import { useEffect, useRef } from 'react';

// custom hooks
import { useSettings } from './util/useSettings';

const MainInput = () => {
	const { setCollection, collectionType } = useSettings();

	const newInputRef = useRef(null);

	useEffect(() => {
		newInputRef.current.value = '';
	});

	const handleOnClick = (e) => {
		e.preventDefault();
		if (!newInputRef.current.value) return;
		setCollection(
			collectionType === 'translatedString'
				? [{ language: 'en', value: newInputRef.current.value }]
				: newInputRef.current.value
		);

		// collectionType === 'translatedString'
		// 				? [{ language: 'en', value: newInputRef.current.value }]
		// 				: newInputRef.current.value,
		// setCollection((prev) => {
		// 	return {
		// 		...prev,
		// 		[collectionType]: [
		// 			...prev[collectionType],
		// 			collectionType === 'translatedString'
		// 				? [{ language: 'en', value: newInputRef.current.value }]
		// 				: newInputRef.current.value,
		// 		],
		// 	};
		// });
	};
	console.log(collectionType, 'in singleInput');
	console.log(newInputRef.current);
	return (
		<label className='flex flex-row gap-2'>
			<input
				id='newInput'
				ref={newInputRef}
				className='inline-block w-3/4 disabled:opacity-70 border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
				name={collectionType}
				type='text'
				onKeyDown={(e) =>
					e.key === 'Enter' && !newInputRef.current.value && e.preventDefault()
				}
			/>

			<button
				id='addNewButton'
				className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
				onClick={(e) => handleOnClick(e)}>
				Add
			</button>
		</label>
	);
};

export default MainInput;
