'use client';

import SubmitButton from '../submitButton/SubmitButton';

export default function ParentForm({ children }) {
	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
		}
	};
	return (
		<form onKeyDown={handleOnKeyDown}>
			{children}
			<SubmitButton />
		</form>
	);
}
