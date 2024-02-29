'use client';
import { createContext, useReducer } from 'react';

import { ADD_GROUPNAME } from './actionTypes';

const initialState = {
  groupName: {},
  collection: [],
  checked: false,
  collectionType: '',
  language: 'en',
};

export const SettingsContext = createContext();

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case ADD_GROUPNAME:
      return {
        ...state,
        groupName: { ...action.payload },
      };
    default:
      return state;
  }
};

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
