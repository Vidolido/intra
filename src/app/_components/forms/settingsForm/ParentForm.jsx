'use client';
import { useRouter } from 'next/navigation';

// state/context
import { useSettingsContext } from '@/app/dashboard/_state/settings/settingsContext';
import { SubmitButton } from '../submitButton/SubmitButton';

// server actions
import { createSetting } from '@/app/_actions/settingsActions';

const ParentForm = ({ children }) => {
	const state = useSettingsContext();
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
