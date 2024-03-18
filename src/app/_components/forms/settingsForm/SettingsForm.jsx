'use client';
import { Suspense, memo, useCallback, useEffect } from 'react';

// state/constext
import { RESET, SET_STATE } from '@/app/dashboard/_state/settings/actionTypes';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

// components
import AddGroupName from './AddGroupName';
import EditGroupName from './EditGroupName';
import ParentForm from './ParentForm';
import RadioButtons from './RadioButtons';
import FormCollection from './FormCollection';
import CollectionInput from './CollectionInput';

import Single from './collections/Single';
import LanguageInput from './collections/LanguageInput';
import Limit from './collections/Limit';
// components

const SettingsForm = ({ data }) => {
	const state = useSettingsContext();
	const globalState = useGlobalStateContext();

	const { placeholder, topHeading, editHeading } = useStaticSettingsContext();
	const { groupName, collectionType, collection } = useSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const { language } = globalState;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => dispatch({ type: RESET }), []);

	const setFormState = useCallback(
		(data) => {
			const { groupName, collection, collectionType } = data;

			const payload = {
				groupName,
				collection,
				collectionType,
			};
			dispatch({ type: SET_STATE, payload });
		},
		[dispatch]
	);

	//   useEffect(
	//     () => dispatch({ type: RESET }),
	//     [dynamicRoute, dispatch, language]
	//   );

	//   useEffect(() => data && setFormState(data), [data, groupName, setFormState]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => data && setFormState(data), [data]);

	// console.log(state, 'THE STATE in SETTINGS FORM');
	// console.log(data, 'THE DATA in SETTINGS FORM');
	// console.log(router, 'THE DYNAMICROUTE');

	return (
		<>
			{/* <h3>{topHeading[lang]}</h3> */}
			<ParentForm>
				{groupName && Object?.keys(groupName).length === 0 ? (
					<>
						<h3>{placeholder[language]}</h3>
						<AddGroupName />
					</>
				) : (
					<>
						<Suspense fallback={<span>Loading...</span>}>
							<h3>{editHeading[language]} </h3>
							<EditGroupName groupName={groupName} />
						</Suspense>
					</>
				)}
				{groupName && Object?.keys(groupName).length > 0 && (
					<hr className='m-5' />
				)}
				{groupName && Object?.keys(groupName).length > 0 && (
					<RadioButtons collectionType={collectionType} />
				)}

				{collectionType && <CollectionInput />}
				{collectionType && (
					<FormCollection>
						{collection[collectionType] &&
							collection[collectionType].map((data) => {
								switch (collectionType) {
									case 'single': {
										return <Single key={data?.id || data?._id} data={data} />;
									}
									case 'translatedString': {
										return (
											<LanguageInput key={data?.id || data?._id} data={data} />
										);
									}
									case 'limit': {
										return <Limit key={data?.id || data?._id} data={data} />;
									}
									default:
										return;
								}
							})}
					</FormCollection>
				)}
			</ParentForm>
		</>
	);
};

export default memo(SettingsForm, (prev, next) => {
	// console.log(prev, 'previous');
	// console.log(next, 'next');
	// return true;
});
