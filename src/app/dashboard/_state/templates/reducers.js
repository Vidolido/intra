import {
	ADD_TEMPLATE_ITEM,
	DELETE_TEMPLATE_ITEM,
	RESET,
	SET_ANALISYS_TYPE,
	SET_INPUT,
	SET_PRODUCT,
	SET_STATE,
	SHOULD_UPDATE,
} from './actionTypes';

export const templatesReducer = (draft, action) => {
	switch (action.type) {
		case SET_ANALISYS_TYPE: {
			console.log(action, 'SET_ANALISYS_TYPE RAN');
			draft.analisysType = action.payload;
			break;
		}
		case SET_PRODUCT: {
			console.log(action, 'SET_PRODUCT RAN');

			draft.product = action.payload;
			break;
		}
		case SET_INPUT: {
			// console.log(action, 'SET_INPUT RAN');

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
			// console.log(action, 'ADD_TEMPLATE_ITEM RAN');

			draft.templateData.push(draft.inputData);
			break;
		}

		case DELETE_TEMPLATE_ITEM: {
			// console.log(action, 'DELETE_TEMPLATE_ITEM RAN');

			// let getDeletedItem = draft.templateData[action.payload];
			// console.log(getDeletedItem, 'in REDUCER');
			draft.templateData.splice(action.payload.index, 1);
			draft.deleted.push(action.payload.row);
			break;
		}

		case SET_STATE: {
			console.log(action, 'SET_STATE RAN');

			// console.log(action, 'in reducer');
			draft.id = action.payload._id;
			draft.analisysType = action.payload.analisysType;
			draft.product = action.payload.product;
			draft.templateData = action.payload.templateData;
			draft.deleted = [];
			draft.shouldUpdate = action.payload.shouldUpdate;

			break;
		}
		case SHOULD_UPDATE: {
			// console.log(action, 'SHOULD_UPDATE RAN');

			draft.shouldUpdate = action.payload;
			break;
		}
		case RESET: {
			console.log(action, 'RESET RAN');

			draft.id = '';
			draft.analisysType = '';
			draft.product = '';
			draft.templateData = [];

			draft.deleted = [];

			draft.shouldUpdate = false;

			break;
		}
		default:
			return;
	}
};
