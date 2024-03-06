'use client';

import {
	useSettingsContext,
	useSettingsDispatch,
} from '@/app/dashboard/_state/settings/SettingsContext';
import { SET_COLLECTION_TYPE } from '@/app/dashboard/_state/settings/actionTypes';
import { useCallback } from 'react';

//custom hooks
// import { useSettings } from './util/useSettings';
const buttonTypes = {
	single: 'Simple Values',
	translatedString: 'Translations',
	limit: 'Limits',
};

export default function RadioButtnos({ collectionType, handleCollectionType }) {
	// const state = useSettingsContext();
	// const dispatch = useSettingsDispatch();
	// const { collectionType } = state;

	// // console.log(state, 'THE STATE');

	// const handleChange = useCallback(
	// 	(e) => {
	// 		console.log(e.target.value, 'THE VALUE');
	// 		dispatch({ type: SET_COLLECTION_TYPE, payload: e.target.value });
	// 	},
	// 	[dispatch]
	// );
	console.log(collectionType, 'collectionType');
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
}
