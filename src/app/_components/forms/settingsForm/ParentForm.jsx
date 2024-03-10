'use client';
import { useRouter } from 'next/navigation';

// state/context
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';
import { useSettingsDispatchContext } from '@/app/dashboard/_state/settings/settingsContext';
import { SubmitButton } from '../submitButton/SubmitButton';

// server actions
import { createSetting } from '@/app/_actions/settingsActions';
import { RESET } from '@/app/dashboard/_state/settings/actionTypes';

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
			action={(e) => {
				sendState();
				// dispatch({ type: RESET });
				console.log(e.form, 'the form');
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
