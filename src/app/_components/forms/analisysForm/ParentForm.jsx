'use client';

// actions
import { createAnalisys } from '@/app/_actions/analisysActions';

// state/context
import {
	useAnalisysContext,
	useAnalisysDispatchContext,
} from '@/app/dashboard/_state/analisys/analisysContext';

// components
import SubmitButton from '../submitButton/SubmitButton';

export default function ParentForm({ children }) {
	const state = useAnalisysContext();
	const dispatch = useAnalisysDispatchContext();

	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const sendState = createAnalisys.bind(null, state);
	console.log(state, 'in parent');
	return (
		<form
			action={() => {
				sendState();
			}}
			onKeyDown={handleOnKeyDown}>
			{children}
			<SubmitButton />
		</form>
	);
}
