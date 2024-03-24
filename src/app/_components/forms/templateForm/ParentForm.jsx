'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// server actions
import { createTemplate, updateTemplate } from '@/app/_actions/temlatesActions';

// state/context
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';

// components
import SubmitButton from '../submitButton/SubmitButton';
import { RESET } from '@/app/dashboard/_state/templates/actionTypes';

const ParentForm = ({ children }) => {
	const state = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();
	const { shouldUpdate } = state;
	const router = useRouter();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch({ type: RESET });
	}, []);

	const sendState = !shouldUpdate
		? createTemplate.bind(null, state)
		: updateTemplate.bind(null, state);

	console.log(state, 'in parent form');
	return (
		<form
			ref={formRef}
			action={() => {
				sendState();
				formRef.current.reset();
				router.push('/dashboard/templates');
			}}
			className='flex w-full flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
			{children}
			<SubmitButton />
		</form>
	);
};

export default ParentForm;
