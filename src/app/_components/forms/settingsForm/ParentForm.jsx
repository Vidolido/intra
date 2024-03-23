'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

// server actions
import { createSetting, updateSetting } from '@/app/_actions/settingsActions';

// state/context
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';

// components
import SubmitButton from '../submitButton/SubmitButton';

const ParentForm = ({ children }) => {
	const state = useSettingsContext();
	const { shouldUpdate } = state;
	const router = useRouter();

	const formRef = useRef(null);

	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const sendState = !shouldUpdate
		? createSetting.bind(null, state)
		: updateSetting.bind(null, state);

	return (
		<form
			ref={formRef}
			action={() => {
				sendState();
				router.push('/dashboard/settings');
			}}
			onKeyDown={handleOnKeyDown}
			className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
			{children}
			<SubmitButton />
		</form>
	);
};

export default ParentForm;
