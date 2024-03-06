import { ADD_GROUPNAME, SET_LANGUAGE } from './actionTypes';

export const settingsReducer = (state, action) => {
	switch (action.type) {
		case SET_LANGUAGE: {
			return { ...state, language: action.payload };
		}
		case ADD_GROUPNAME: {
			return {
				...state,
				groupName: {
					...state.groupName,
					[action.payload.language]: action.payload.value,
				},
			};
		}
		default:
			state;
	}
};
