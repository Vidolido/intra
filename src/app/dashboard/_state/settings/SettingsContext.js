'use client';
import { createContext, useReducer } from 'react';

import {
  ADD_GROUPNAME,
  EXTRACT_DATA,
  SET_COLLECTION,
  SET_COLLECTION_TYPE,
} from './actionTypes';

const initialState = {
  extractedData: {
    dataFor: '',
    data: null,
  },
  groupName: [],
  collection: {
    single: [],
    translatedString: [],
    limit: [],
  },
  checked: false,
  collectionType: 'single',
  language: 'en',
  buttonTypes: {
    single: 'Simple Values',
    translatedString: 'Translations',
    limit: 'Limits',
  },
};

export const SettingsContext = createContext();

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case EXTRACT_DATA:
      return { ...state, extractedData: action.payload };
    case ADD_GROUPNAME:
      return {
        ...state,
        groupName: [...action.payload],
      };
    case SET_COLLECTION_TYPE:
      // Треба предупредвање пред промена "Ќе ги избришете сите внесени полиња, сигрни ли сте дека сакате да продолжите?"
      return {
        ...state,
        collectionType: action.payload,
        collection: initialState.collection,
      };
    case SET_COLLECTION:
      return {
        ...state,
        collection: {
          ...state.collection,
          [state.collectionType]: [
            ...state.collection[state.collectionType],
            action.payload,
          ],
        },
      };
    case ADD_TO_COLLECTION:
      return {
        ...state,
        collection: [...state.collection, action.payload],
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
