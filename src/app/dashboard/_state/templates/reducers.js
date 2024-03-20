import {
	ADD_TEMPLATE_ITEM,
	RESET,
	SET_ANALISYS_TYPE,
	SET_INPUT,
	SET_PRODUCT,
} from './actionTypes';

export const templatesReducer = (draft, action) => {
	switch (action.type) {
		case SET_ANALISYS_TYPE: {
			console.log(action.payload, 'it RAN');
			draft.analisysType = action.payload;
			break;
		}
		case SET_PRODUCT: {
			draft.product = action.payload;
			break;
		}
		case SET_INPUT: {
			const index = draft.inputData.findIndex(
				(item) => JSON.stringify(item[0]) === JSON.stringify(action.payload[0])
			);

			if (index === -1) {
				draft.inputData.push(action.payload);
			} else {
				draft.inputData[index][1] = action.payload[1];
			}
			break;
		}
		case ADD_TEMPLATE_ITEM: {
			// console.log(action, 'in reducer');
			draft.templateData.push(draft.inputData);
			break;
		}
		case RESET: {
			draft.templateData = [];
			break;
		}
		default:
			return;
	}
};
