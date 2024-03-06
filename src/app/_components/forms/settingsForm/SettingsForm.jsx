'use client';

import { useCallback } from 'react';
import { useImmerReducer } from 'use-immer';

import { settingsReducer } from '@/app/dashboard/_state/settings/reducers';
import { settingsState } from '@/app/dashboard/_state/settings/initState';

// components
import TranslateInput from './TranslateInput';
import RadioButtnos from './RadioButtons';
import MainInput from './MainInput';
import FormCollection from './FormCollection';
import { SubmitButton } from '../submitButton/SubmitButton';
import {
	ADD_GROUPNAME,
	EXTRACT_DATA,
	SET_COLLECTION_TYPE,
} from '@/app/dashboard/_state/settings/actionTypes';

const SettingsForm = () => {
	const [state, dispatch] = useImmerReducer(settingsReducer, settingsState);

	const extractData = useCallback(
		(data) => {
			console.log('extracting data: ', data);
			const newGroupName = state.groupName;

			// console.log(newGroupName.find((e) => e === data));
			// if (!newGroupName.find((e) => e === data)) {
			dispatch({
				type: ADD_GROUPNAME,
				payload: data,
			});
			// }
			// dispatch({ type: EXTRACT_DATA, payload: { dataFor: 'groupName', data } });
		},
		[state.groupName, dispatch]
	);

	const handleCollectionType = useCallback(
		(e) => {
			dispatch({ type: SET_COLLECTION_TYPE, payload: e.target.value });
		},
		[dispatch]
	);
	// console.log(state);
	return (
		<form className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
			<span>Title</span>

			<TranslateInput
				submitOnEnter={false}
				name={'groupName'}
				// setExtractedData={setExtractedData}
				item={state.groupName}
				extractData={extractData}
			/>

			<RadioButtnos
				collectionType={state.collectionType}
				handleCollectionType={handleCollectionType}
			/>

			{/* <MainInput /> */}

			{/* {collection[collectionType].length > 0 && <hr className='m-5' />} */}

			{/* {collection[collectionType].length > 0 && (
        <FormCollection
          collectionType={collectionType}
          formCollection={collection}
        />
      )} */}
			{/* {collection[collectionType].length > 0 && <SubmitButton />} */}
		</form>
	);
};

export default SettingsForm;
