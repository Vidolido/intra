'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// server actions
import { createTemplate } from '@/app/_actions/temlatesActions';

// state/context
import { RESET } from '@/app/dashboard/_state/templates/actionTypes';
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';

// components
import SubmitButton from '../submitButton/SubmitButton';

const ParentForm = ({ children }) => {
	const { analisysType, product, templateData } = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();
	const router = useRouter();

	// Да видам дали ова треба тука или може да иде во акцијата.
	useEffect(() => {
		dispatch({ type: RESET });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const payload = { analisysType, product, templateData };
	const sendState = createTemplate.bind(null, payload);

	// console.log(state);
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
