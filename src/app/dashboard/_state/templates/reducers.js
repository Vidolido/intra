import {
	ADD_TEMPLATE_ITEM,
	DELETE_TEMPLATE_ITEM,
	RESET,
	SET_ANALISYS_TYPE,
	SET_INPUT,
	SET_PRODUCT,
	SET_STATE,
} from './actionTypes';

export const templatesReducer = (draft, action) => {
	switch (action.type) {
		case SET_ANALISYS_TYPE: {
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
			draft.templateData.push(draft.inputData);
			break;
		}

		case DELETE_TEMPLATE_ITEM: {
			draft.templateData.splice(action.payload, 1);
			break;
		}

		case SET_STATE: {
			draft.analisysType = action.payload.analisysType;
			draft.product = action.payload.product;
			draft.templateData = action.payload.templateData;

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
