'use client';
import { useRouter } from 'next/navigation';

// server actions
import { createSetting } from '@/app/_actions/settingsActions';

// state/context
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { settingsState } from '@/app/dashboard/_state/settings/initState';
import { RESET } from '@/app/dashboard/_state/settings/actionTypes';

// components
import { SubmitButton } from '../submitButton/SubmitButton';

const ParentForm = ({ children }) => {
	const state = useSettingsContext();
	const dispatch = useSettingsDispatchContext();
	const router = useRouter();

	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
		}
	};
	// console.log(state, 'THE STATE IN PARENT');
	const sendState = createSetting.bind(null, state);
	return (
		<form
			action={() => {
				sendState();
				dispatch({ type: RESET, payload: settingsState });
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
