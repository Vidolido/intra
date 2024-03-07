'use client';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';

// state/constext
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';

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

const SettingsForm = () => {
	const { placeholder, topHeading, editHeading } = useStaticSettingsContext();
	const { groupName, collectionType, collection } = useSettingsContext();

	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');

	const headingRef = useRef(null);

	return (
		<>
			us
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
							collection[collectionType].map((item, index) => {
								switch (collectionType) {
									case 'single': {
										return <Single key={index} item={item} index={index} />;
									}
									case 'translatedString': {
										return (
											<LanguageInput key={index} item={item} index={index} />
										);
									}
									case 'limit': {
										return <Limit key={index} item={item} index={index} />;
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
