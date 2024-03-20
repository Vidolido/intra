import {
	SET_ANALISYS_RESULT,
	SET_ANALISYS_TYPE,
	SET_PRODUCT,
	SET_TEMPLATES,
} from './actionTypes';

export const analisysReducer = (draft, action) => {
	switch (action.type) {
		case SET_PRODUCT: {
			// console.log(action, 'reducer product');
			draft.header.product = action.payload;
			break;
		}
		case SET_TEMPLATES: {
			// console.log(action, 'eve ovoj');
			draft.templates = action.payload;

			break;
		}
		case SET_ANALISYS_TYPE: {
			// console.log(action, 'reducer analisysType');

			draft.header.analisysType = action.payload;
			break;
		}
		case SET_ANALISYS_RESULT: {
			console.log(action, 'it ran');
			draft.analisysResult = action.payload;
			break;
		}
		default:
			return;
	}
};
