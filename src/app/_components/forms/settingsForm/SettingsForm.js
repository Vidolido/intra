'use client';
import { useState } from 'react';

// state/constext
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

// components
import AddGroupName from './AddGroupName';
import EditGroupName from './EditGroupName';
import ParentForm from './ParentForm';
import RadioButtons from './RadioButtons';

const SettingsForm = () => {
	const { groupName } = useSettingsContext();

	return (
		<ParentForm>
			{Object.keys(groupName).length === 0 ? (
				<>
					<AddGroupName />
				</>
			) : (
				<>
					<h3>Edit Group Name: </h3>
					<EditGroupName />
				</>
			)}
			<hr className='m-5' />
			<RadioButtons />
		</ParentForm>
	);
};

export default SettingsForm;
