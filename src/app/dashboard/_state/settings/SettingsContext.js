'use client';
import { createContext, useReducer } from 'react';

import {
	ADD_GROUPNAME,
	SET_COLLECTION,
	SET_COLLECTION_TYPE,
} from './actionTypes';

const initialState = {
	groupName: {},
	collection: {
		single: [],
		translatedString: [],
		limit: [],
	},
	checked: false,
	collectionType: 'translatedString',
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
		case ADD_GROUPNAME:
			return {
				...state,
				groupName: { ...action.payload },
			};
		case SET_COLLECTION_TYPE:
			console.log('collection');
			return {
				...state,
				collectionType: action.payload,
			};
		case SET_COLLECTION:
			return {
				...state,
				collection: {
					[state.collectionType]: [
						...state.collection[state.collectionType],
						action.payload,
					],
				},
			};

		// return {
		// 		...prev,
		// 		[collectionType]: [
		// 			...prev[collectionType],
		// 			collectionType === 'translatedString'
		// 				? [{ language: 'en', value: newInputRef.current.value }]
		// 				: newInputRef.current.value,
		// 		],
		// 	}
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
