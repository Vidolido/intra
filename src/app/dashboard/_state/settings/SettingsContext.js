'use client';
import { createContext, useContext, useReducer } from 'react';
import { produce } from 'immer';

import {
	ADD_GROUPNAME,
	EXTRACT_DATA,
	SET_COLLECTION,
	SET_COLLECTION_TYPE,
} from './actionTypes';
import { useImmerReducer } from 'use-immer';

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
};

export const SettingsContext = createContext();
export const DispatchContext = createContext();

export const exSettingsReducer = (draft, action) => {
	switch (action.type) {
		case EXTRACT_DATA: {
			const { dataFor, data } = action.payload;
			draft[dataFor].push(data);
			break;
		}
		// return { ...draft, extractedData: action.payload };
		case ADD_GROUPNAME:
			return {
				...draft,
				groupName: [...action.payload],
			};

		case SET_COLLECTION_TYPE:
			draft.collectionType = action.payload;
			draft.collection = initialState.collection;
			break;

		case SET_COLLECTION:
			return {
				...draft,
				collection: {
					...draft.collection,
					[draft.collectionType]: [
						...draft.collection[draft.collectionType],
						action.payload,
					],
				},
			};
		case ADD_TO_COLLECTION:
			return {
				...draft,
				collection: [...draft.collection, action.payload],
			};
		default:
			return draft;
	}
};

export const SettingsContextProvider = ({ children }) => {
	const [state, dispatch] = useImmerReducer(exSettingsReducer, initialState);
	// const [state, dispatch] = useReducer(settingsReducer, initialState);

	return (
		<SettingsContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	return useContext(SettingsContext);
};

export const useSettingsDispatch = () => {
	return useContext(DispatchContext);
};
