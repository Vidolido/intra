'use client';

//custom hooks
import { useSettings } from './util/useSettings';

export default function RadioButtnos() {
	const { collectionType, setCollectionType, buttonTypes } = useSettings();
	console.log(collectionType);
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
								onChange={() => setCollectionType(type[0])}
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
}
