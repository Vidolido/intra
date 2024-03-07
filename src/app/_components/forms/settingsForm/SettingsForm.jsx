'use client';

// state/constext
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';

// components
import AddGroupName from './AddGroupName';
import EditGroupName from './EditGroupName';
import ParentForm from './ParentForm';
import RadioButtons from './RadioButtons';
import FormCollection from './FormCollection';
import CollectionInput from './CollectionInput';

const SettingsForm = () => {
	const { groupName, collectionType, collection } = useSettingsContext();

	return (
		<ParentForm>
			{Object.keys(groupName).length === 0 ? (
				<>
					<AddGroupName />
				</>
			) : (
				<>
					<h3>Edit Group Name: </h3>
					<EditGroupName groupName={groupName} />
				</>
			)}
			{Object.keys(groupName).length > 0 && <hr className='m-5' />}
			{Object.keys(groupName).length > 0 && (
				<RadioButtons collectionType={collectionType} />
			)}

			{collection[collectionType] && <CollectionInput />}
			{collection[collectionType] && <FormCollection />}
		</ParentForm>
	);
};

export default SettingsForm;
