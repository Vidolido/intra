'use client';

import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { globalState } from './initState';
import { globalStateReducer } from './reducer';

export const GlobalStateContext = createContext();
export const GlobalStateDispatchContext = createContext();

export const GlobalStateContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(globalStateReducer, globalState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => {
  return useContext(GlobalStateContext);
};

export const useGlobalStateDispatchContext = () => {
  return useContext(GlobalStateDispatchContext);
};
