'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'
			type='submit'
			aria-disabled={pending}
			disabled={pending}>
			Save
		</button>
	);
}
