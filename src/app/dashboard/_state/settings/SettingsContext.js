'use client';
import { createContext, useContext, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';

import { settingsState } from './initState';
import { settingsReducer } from './reducers';

export const SettingsContext = createContext();
export const SettingsDispatchContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(settingsReducer, settingsState);

  return (
    <SettingsContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

export const useSettingsDispatchContext = () => {
  return useContext(SettingsDispatchContext);
};
