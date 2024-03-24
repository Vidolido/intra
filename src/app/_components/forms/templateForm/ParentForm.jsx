'use client';
import { useRouter } from 'next/navigation';

// server actions
import { createTemplate, updateTemplate } from '@/app/_actions/temlatesActions';

// state/context
import { useTemplatesContext } from '@/app/dashboard/_state/templates/templatesContext';

// components
import SubmitButton from '../submitButton/SubmitButton';

const ParentForm = ({ children }) => {
	const state = useTemplatesContext();
	const { shouldUpdate } = state;

	const router = useRouter();

	const sendState = !shouldUpdate
		? createTemplate.bind(null, state)
		: updateTemplate.bind(null, state);

	return (
		<form
			action={() => {
				sendState();
				router.push('/dashboard/templates');
			}}
			className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
			{children}
			<SubmitButton />
		</form>
	);
};

export default ParentForm;
