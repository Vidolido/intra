import {
	SET_ANALISYS_RESULT,
	SET_ANALISYS_TYPE,
	SET_PRODUCT,
	SET_TEMPLATES,
} from './actionTypes';

export const analisysReducer = (draft, action) => {
	switch (action.type) {
		case SET_PRODUCT: {
			draft.header.product = action.payload;
			break;
		}
		case SET_TEMPLATES: {
			draft.templates = action.payload;
			break;
		}
		case SET_ANALISYS_TYPE: {
			draft.header.analisysType = action.payload;
			break;
		}
		case SET_ANALISYS_RESULT: {
			draft.analisysResult = action.payload;
			break;
		}
		default:
			return;
	}
};
