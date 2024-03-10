'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

// state/constext
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import {
	useSettingsContext,
	useSettingsDispatchContext,
} from '@/app/dashboard/_state/settings/settingsContext';
import { RESET, SET_STATE } from '@/app/dashboard/_state/settings/actionTypes';

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
	const { placeholder, topHeading, editHeading } = useStaticSettingsContext();
	const { groupName, collectionType, collection } = useSettingsContext();
	const dispatch = useSettingsDispatchContext();

	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');

	const setFormState = useCallback(
		(data) => {
			const { groupName, collection, collectionType } = data;

			// Овде сакав да менувам
			const payload = {
				groupName,
				collection: {
					[collectionType]: [...collection],
				},
				collectionType,
			};

			dispatch({ type: SET_STATE, payload });
		},
		[dispatch]
	);
	useEffect(() => {
		if (data !== undefined) {
			setFormState(data);
		} else {
			dispatch({ type: RESET });
		}
	}, [data, setFormState, dispatch]);
	return (
		<>
			{/* <h3>{topHeading[lang]}</h3> */}
			<ParentForm>
				{Object.keys(groupName).length === 0 ? (
					<>
						<h3>{placeholder[lang]}</h3>
						<AddGroupName />
					</>
				) : (
					<>
						<h3>{editHeading[lang]} </h3>
						<EditGroupName groupName={groupName} />
					</>
				)}
				{Object.keys(groupName).length > 0 && <hr className='m-5' />}
				{Object.keys(groupName).length > 0 && (
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

export default SettingsForm;
