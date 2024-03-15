'use client';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { settingsState } from './initState';
import { settingsReducer } from './reducers';

export const EditSettingsContext = createContext();
export const EditSettingsDispatchContext = createContext();

export const SettingsContextProvider = ({ children }) => {
	const [state, dispatch] = useImmerReducer(settingsReducer, settingsState);

	return (
		<EditSettingsContext.Provider value={state}>
			<EditSettingsDispatchContext.Provider value={dispatch}>
				{children}
			</EditSettingsDispatchContext.Provider>
		</EditSettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	return useContext(EditSettingsContext);
};

export const useSettingsDispatchContext = () => {
	return useContext(EditSettingsDispatchContext);
};
