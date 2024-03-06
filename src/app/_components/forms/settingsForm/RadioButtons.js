import { useState } from 'react';

const RadioButtons = () => {
	const [collectionType, setCollectionType] = useState('sipmle');
	const buttonTypes = {
		single: 'Simple Values',
		translatedString: 'Translations',
		limit: 'Limits',
	};

	const handleCollectionType = (e) => {
		setCollectionType(e.target.value);
	};
	return (
		<fieldset>
			<legend>Select a type:</legend>
			<div className='flex flex-row gap-2'>
				{Object.entries(buttonTypes).map((type, i) => {
					return (
						<div key={i} className='flex gap-1'>
							<input
								type='radio'
								id={type[0]}
								name='collectionType'
								className='cursor-pointer'
								value={type[0]}
								checked={type[0] === collectionType}
								onChange={handleCollectionType}
							/>
							<label htmlFor={type[0]} className='cursor-pointer'>
								{type[1]}
							</label>
						</div>
					);
				})}
			</div>
		</fieldset>
	);
};

export default RadioButtons;
