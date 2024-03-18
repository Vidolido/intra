'use client';

import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { templatesState } from './initState';
import { templatesReducer } from './reducers';

export const TemplatesContext = createContext();
export const TemplatesDispatchContext = createContext();

export const TemplatesContextProvider = ({ children }) => {
	const [state, dispatch] = useImmerReducer(templatesReducer, templatesState);

	return (
		<TemplatesContext.Provider value={state}>
			<TemplatesDispatchContext.Provider value={dispatch}>
				{children}
			</TemplatesDispatchContext.Provider>
		</TemplatesContext.Provider>
	);
};

export const useTemplatesContext = () => {
	return useContext(TemplatesContext);
};

export const useTemplatesDispatchContext = () => {
	return useContext(TemplatesDispatchContext);
};
