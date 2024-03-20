'use client';

import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { analisysState } from './initState';
import { analisysReducer } from './reducers';

export const AnalisysContext = createContext();
export const AnalisysDispatchContext = createContext();

export const AnalisysContextProvider = ({ children }) => {
	const [state, dispatch] = useImmerReducer(analisysReducer, analisysState);

	return (
		<AnalisysContext.Provider value={state}>
			<AnalisysDispatchContext.Provider value={dispatch}>
				{children}
			</AnalisysDispatchContext.Provider>
		</AnalisysContext.Provider>
	);
};

export const useAnalisysContext = () => {
	return useContext(AnalisysContext);
};

export const useAnalisysDispatchContext = () => {
	return useContext(AnalisysDispatchContext);
};
