import { memo, useState } from 'react';

const LanguageInput = ({ item }) => {
	const [canEdit, setCanEdit] = useState(false);
	console.log(item);
	return (
		<label>
			{!canEdit && (
				<h3
					onClick={() => setCanEdit(!canEdit)}
					className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'>
					{item}
				</h3>
			)}
			{canEdit && (
				<input
					type='text'
					className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
					placeholder={item}
				/>
			)}
		</label>
	);
};

export default memo(LanguageInput);
