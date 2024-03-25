import {
	SET_ANALISYS_RESULT,
	SET_ANALISYS_TYPE,
	SET_HEADER_DATA,
	SET_PRODUCT,
	SET_TEMPLATES,
} from './actionTypes';

export const analisysReducer = (draft, action) => {
	switch (action.type) {
		case SET_PRODUCT: {
			draft.product = action.payload;
			break;
		}

		case SET_ANALISYS_TYPE: {
			draft.analisysType = action.payload;
			break;
		}
		case SET_HEADER_DATA: {
			const sortData = Object.entries(action.payload)[0];
			draft.header[sortData[0]] = sortData[1];
			break;
		}
		case SET_TEMPLATES: {
			// console.log(action, 'in REDUCER');
			draft.templates = action.payload;
			break;
		}
		case SET_ANALISYS_RESULT: {
			// console.log(action);
			// draft.analisysResult.push(action.payload);
			draft.analisysResult[action.payload.index] = action.payload.row;
			break;
		}
		default:
			return;
	}
};
