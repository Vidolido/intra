import { ADD_GROUPNAME, SET_COLLECTION_TYPE } from './actionTypes';

export const settingsReducer = (draft, action) => {
	switch (action.type) {
		// case EXTRACT_DATA: {
		// 	const { dataFor, data } = action.payload;
		// 	draft[dataFor].push(data);
		// 	break;
		// }
		// return { ...draft, extractedData: action.payload };
		case ADD_GROUPNAME:
			console.log(action.payload, 'u reducer');
			// draft.groupName.push(action.payload);
			break;
		// return {
		// 	...draft,
		// 	groupName: [...action.payload],
		// };

		case SET_COLLECTION_TYPE:
			draft.collectionType = action.payload;
			draft.collection = initialState.collection;
			break;

		// case SET_COLLECTION:
		// 	return {
		// 		...draft,
		// 		collection: {
		// 			...draft.collection,
		// 			[draft.collectionType]: [
		// 				...draft.collection[draft.collectionType],
		// 				action.payload,
		// 			],
		// 		},
		// 	};
		// case ADD_TO_COLLECTION:
		// 	return {
		// 		...draft,
		// 		collection: [...draft.collection, action.payload],
		// 	};
		default:
			return draft;
	}
};
