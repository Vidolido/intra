'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { analisysState } from './initState';
import { analisysReducer } from './reducers';

export const AnalisysContext = createContext();
export const AnalisysDispatchContext = createContext();

export const AnalisysContextProvider = ({ children }) => {
	const [state, dispatch] = useImmerReducer(analisysReducer, analisysState);

	// const contextState = useMemo(() => ({ ...state }), [state]);
	return (
		<AnalisysContext.Provider value={state}>
			{/* <AnalisysContext.Provider value={contextState}> */}
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
