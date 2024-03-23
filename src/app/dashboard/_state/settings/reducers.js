import {
	ADD_GROUPNAME,
	ADD_TO_COLLECTION,
	DELETE_COLLECTION,
	DELETE_FROM_COLLECTION,
	EDIT_COLLECTION_ITEM,
	RESET,
	SET_COLLECTION_TYPE,
	SET_LANGUAGE,
	SET_STATE,
	SHOULD_UPDATE,
} from './actionTypes';

export const settingsReducer = (draft, action) => {
	switch (action.type) {
		case SET_LANGUAGE: {
			draft.language = action.payload;
			break;
		}
		case ADD_GROUPNAME: {
			// console.log(action.payload, 'ADD_GROUPNAME IN REDUCER');
			draft.groupName[action.payload.language] = action.payload.value;
			break;
		}
		case SET_COLLECTION_TYPE: {
			draft.collectionType = action.payload;

			// Да го средам ова на друг начин
			// draft.collection = {
			// 	single: [],
			// 	translatedString: [],
			// 	limit: [],
			// };
			break;
		}
		case ADD_TO_COLLECTION: {
			draft.collection[draft.collectionType].push(action.payload.data);
			break;
		}
		case EDIT_COLLECTION_ITEM: {
			// console.log(action.payload, 'REDUCER');
			const index = draft.collection[draft.collectionType].findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				if (action.payload.item.language) {
					draft.collection[draft.collectionType][index].item[
						action.payload.item.language
					] = action.payload.item.value;
				} else {
					draft.collection[draft.collectionType][index].item =
						action.payload.item;
				}
			}
			break;
		}
		case DELETE_COLLECTION: {
			break;
		}
		case DELETE_FROM_COLLECTION: {
			// console.log(action, 'DELETE REDUC');
			draft.collection[draft.collectionType].splice(
				draft.collection[draft.collectionType].findIndex(
					(item) => item.id === action.payload
				),
				1
			);
			break;
		}
		case SET_STATE: {
			// console.log(action.payload, 'PAYLOAD in REDUCER');

			draft.groupName = action.payload.groupName;

			draft.collection[action.payload.collectionType] =
				action.payload.collection[action.payload.collectionType];

			draft.collectionType = action.payload.collectionType;
			draft.shouldUpdate = action.payload.shouldUpdate;
			break;
		}
		case SHOULD_UPDATE: {
			// console.log(action, ' action in REDUCER');
			draft.shouldUpdate = action.payload;
		}

		case RESET: {
			// console.log('it ran again', action);
			draft.groupName = {};
			draft.collection = {
				single: [],
				translatedString: [],
				limit: [],
			};
			draft.collectionType = '';
			draft.shouldUpdate = false;

			break;
		}
		default:
			// draft;
			return;
	}
};
